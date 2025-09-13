import { getPayload as getPayloadInstance } from "payload";
import config from "@/payload.config";

export const getPayload = async () => getPayloadInstance({ config });

export async function getGlobal(slug: string) {
	const payload = await getPayload();

	try {
		const data = await payload.findGlobal({
			slug,
			depth: 2, // Include related documents like media
		});
		return data;
	} catch (error) {
		console.error(`Error fetching global ${slug}:`, error);
		return null;
	}
}

export async function getCollection(slug: string, options = {}) {
	const payload = await getPayload();

	try {
		const data = await payload.find({
			collection: slug,
			depth: 2,
			...options,
		});
		return data;
	} catch (error) {
		console.error(`Error fetching collection ${slug}:`, error);
		return null;
	}
}

// Helper to get a single document by slug
export async function getDocBySlug(collection: string, slug: string) {
	const payload = await getPayload();

	try {
		const data = await payload.find({
			collection,
			where: {
				slug: {
					equals: slug,
				},
			},
			depth: 2,
			limit: 1,
		});

		return data.docs[0] || null;
	} catch (error) {
		console.error(`Error fetching ${collection} with slug ${slug}:`, error);
		return null;
	}
}
