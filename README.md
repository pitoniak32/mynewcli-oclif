mynewcli
=================

Created to allow full gcs support for `@oclif/plugin-update`

# Publishing

## Prepare

Using `oclif pack` to generate tarballs, and buildmanifests so we can upload them to GCS.
```
pnpm prep
```

## Upload

Using `mynewcli upload` to upload the generated, and buildmanifests so we can upload them to GCS.
```
pnpm upload
```

## Promotion

Using `mynewcli promote to upload the `

To promote a version use:
```
./bin/dev.js promote --sha=<short-sha> --version=<semver-version> --indexes
```

where:
- `<short-sha>` - is the short commit hash of the tar to promote. **(ex: `d746278`)**
- `<semver-version>` - is the semantic version of the tar to promote. **(ex: `0.0.0`)**
- `--indexes` - specifies to update the versioning index files.
