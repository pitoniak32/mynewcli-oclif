import { Command, Flags } from '@oclif/core'
import path from 'node:path'

import * as Tarballs from '../tarballs/index.js'
import { channelAWSDir, commitAWSDir, templateShortKey } from '../upload-util.js'
import { appendToIndex } from '../version-indexes.js'

import { Storage } from '@google-cloud/storage'

export default class Promote extends Command {
  static description = 'Promote CLI builds to a S3 release channel.'
  static flags = {
    channel: Flags.string({default: 'stable', description: 'Channel to promote to.', required: true}),
    'dry-run': Flags.boolean({
      description: 'Run the command without uploading to S3 or copying versioned tarballs/installers to channel.',
    }),
    'ignore-missing': Flags.boolean({
      description: 'Ignore missing tarballs/installers and continue promoting the rest.',
    }),
    indexes: Flags.boolean({description: 'Append the promoted urls into the index files.'}),
    'max-age': Flags.string({char: 'a', default: '86400', description: 'Cache control max-age in seconds.'}),
    root: Flags.string({char: 'r', default: '.', description: 'Path to the oclif CLI project root.', required: true}),
    sha: Flags.string({description: '7-digit short git commit SHA of the CLI to promote.', required: true}),
    targets: Flags.string({char: 't', description: 'Comma-separated targets to promote (e.g.: linux-arm,win32-x64).'}),
    version: Flags.string({description: 'Semantic version of the CLI to promote.', required: true}),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Promote)
    if (flags['ignore-missing']) {
      this.warn(
        "--ignore-missing flag is being used - This command will continue to run even if a promotion fails because it doesn't exist",
      )
    }

    this.log(`Promoting v${flags.version} (${flags.sha}) to ${flags.channel} channel\n`)

    const buildConfig = await Tarballs.buildConfig(flags.root, {targets: flags?.targets?.split(',')})
    const {config, s3Config} = buildConfig
    const indexDefaults = {
      maxAge: `max-age=${flags['max-age']}`,
      s3Config,
      version: flags.version,
    }

    if (!s3Config.bucket) this.error('Cannot determine bucket for promotion')

    const storage = new Storage()

    // const awsDefaults = {
    //   ACL: s3Config.acl ?? ObjectCannedACL.public_read,
    //   Bucket: s3Config.bucket,
    //   CacheControl: indexDefaults.maxAge,
    //   MetadataDirective: MetadataDirective.REPLACE,
    // }
    const cloudBucketCommitKey = (shortKey: string) =>
      path.join(commitAWSDir(flags.version, flags.sha, s3Config), shortKey)
    const cloudChannelKey = (shortKey: string) => path.join(channelAWSDir(flags.channel, s3Config), shortKey)

    // copy tarballs manifests
    const promoteManifest = async (target: (typeof buildConfig.targets)[number]) => {
      const manifest = templateShortKey('manifest', {
        arch: target.arch,
        bin: config.bin,
        platform: target.platform,
        sha: flags.sha,
        version: flags.version,
      })
      // strip version & sha so update/scripts can point to a static channel manifest
      const unversionedManifest = manifest.replace(`-v${flags.version}-${flags.sha}`, '')

      const dest = storage.bucket(s3Config.bucket!).file(cloudBucketCommitKey(unversionedManifest))

      await storage.bucket(s3Config.bucket!).file(cloudBucketCommitKey(manifest)).copy(dest)
    }

    const promoteGzTarballs = async (target: (typeof buildConfig.targets)[number]) => {
      const versionedTarGzName = templateShortKey('versioned', {
        arch: target.arch,
        bin: config.bin,
        ext: '.tar.gz',
        platform: target.platform,
        sha: flags.sha,
        version: flags.version,
      })
      const versionedTarGzKey = cloudBucketCommitKey(versionedTarGzName)
      // strip version & sha so update/scripts can point to a static channel tarball
      const unversionedTarGzName = versionedTarGzName.replace(`-v${flags.version}-${flags.sha}`, '')
      const unversionedTarGzKey = cloudChannelKey(unversionedTarGzName)
      console.dir(
          {
            msg: 'gztar',
            CopySource: versionedTarGzKey,
            Key: unversionedTarGzKey,
          }
      )

      await Promise.all([
        await storage.bucket(s3Config.bucket!).file(versionedTarGzKey).copy(storage.bucket(s3Config.bucket!).file(cloudBucketCommitKey(unversionedTarGzKey))),
        ...(flags.indexes
          ? [
              appendToIndex({
                ...indexDefaults,
                dryRun: flags['dry-run'],
                filename: unversionedTarGzName,
                originalUrl: versionedTarGzKey,
              }),
            ]
          : []),
      ])
    }

    await Promise.all([
      ...buildConfig.targets.flatMap((target) => [
        // always promote the manifest and gz
        promoteManifest(target),
        promoteGzTarballs(target),
      ]),
    ])
  }
}
