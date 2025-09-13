import type { Metadata } from "next";
import { RootPage } from "@payloadcms/next/views";
import configPromise from "@/payload.config";

type Args = {
	params: Promise<{
		segments: string[];
	}>;
	searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
	const config = await configPromise;
	return {
		title: "Sópé Admin",
		description: "Admin Panel",
	};
};

const Page = async ({ params, searchParams }: Args) => {
	const config = await configPromise;
	return RootPage({
		config,
		params: await params,
		searchParams: await searchParams,
	});
};

export default Page;
