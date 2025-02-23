import path from "node:path";

import { Storage } from "@google-cloud/storage";
import { debug as Debug, log } from "./log.js";
import type { BuildConfig } from "./tarballs/index.js";

const debug = Debug.extend("version-indexes");

interface VersionsObject {
	[key: string]: string;
}

const sortVersionsObjectByKeysDesc = (
	input: VersionsObject,
	keyLimit?: number,
): VersionsObject => {
	const keys = (
		Reflect.ownKeys(input).sort((a, b) => {
			const splitA = (a as string)
				.split(".")
				.map((part) => Number.parseInt(part, 10));
			const splitB = (b as string)
				.split(".")
				.map((part) => Number.parseInt(part, 10));
			// sort by major
			if (splitA[0] < splitB[0]) return 1;
			if (splitA[0] > splitB[0]) return -1;
			// sort by minor
			if (splitA[1] < splitB[1]) return 1;
			if (splitA[1] > splitB[1]) return -1;
			// sort by patch
			if (splitA[2] < splitB[2]) return 1;
			if (splitA[2] > splitB[2]) return -1;
			return 0;
		}) as string[]
	).slice(0, keyLimit); // undefined keyLimit returns the entire array
	const result: VersionsObject = {};
	for (const key of keys) {
		result[key] = input[key];
	}

	return result;
};

// appends to an existing file (or writes a new one) with the versions in descending order, with an optional limit from the pjson file
export const appendToIndex = async (input: {
	dryRun?: boolean;
	filename: string;
	maxAge: string;
	originalUrl: string;
	s3Config: BuildConfig["s3Config"];
	version: string;
}): Promise<void> => {
	const { filename, maxAge, originalUrl, s3Config, version } = input;
	// these checks are both nice for users AND helpful for TS
	if (!s3Config.bucket)
		throw new Error("[package.json].oclif.s3.bucket is required for indexes");
	if (!s3Config.host)
		throw new Error("[package.json].oclif.s3.host is required for indexes");

	const storage = new Storage();

	// json-friendly filenames like sfdx-linux-x64-tar-gz
	const jsonFileName = `${filename.replaceAll(".", "-")}.json`;
	// folder is optional, but honored if present
	const key = path.join(s3Config.folder ?? "", "versions", jsonFileName);

	// retrieve existing index file
	let existing = {};
	try {
		let contents = {}
		if (!input.dryRun) {
			contents = await storage.bucket(s3Config.bucket).file(key).download();
		} else {
			log(`[DRY_RUN] skipping fetch from bucket: ${s3Config.bucket} @ ${key}`)
		}

		existing = JSON.parse(contents.toString());

		debug("appending to existing index file");
	} catch (error: unknown) {
		debug(`error on ${key}`, error);
	}

	const updated = JSON.stringify(
		sortVersionsObjectByKeysDesc(
			{
				...existing,
				[version]: originalUrl.replace(s3Config.bucket, s3Config.host),
			},
			s3Config.indexVersionLimit,
		),
		null,
		2,
	)

	log(`before: ${JSON.stringify(existing, null,2)}`)
	log(`after : ${updated}`)

	// put the file back in the same place
	if (!input.dryRun) {
		await storage.bucket(s3Config.bucket).file(key).save(updated);
	} else {
		log(`[DRY_RUN] skipping upload: ${key}`)
	}
};
