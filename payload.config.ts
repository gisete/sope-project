// sope-website/payload.config.ts
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./src/collections/Users";
import { Pages } from "./src/collections/Pages";
import { Media } from "./src/collections/Media";
import { Homepage } from "./src/globals/Homepage";
import { MainMenu } from "./src/globals/MainMenu";
import { QuemSomos } from "./src/globals/QuemSomos";
import { Inscricoes } from "./src/globals/Inscricoes";
import { Contactos } from "./src/globals/Contactos";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const config = buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		meta: {
			titleSuffix: " - Sópé Admin",
			favicon: "/favicon.ico",
		},
		// Optional: Add custom CSS if you want to customize admin panel appearance
		// css: path.resolve(dirname, 'src/styles/payload-custom.css'),
	},

	// Update this to use your Vercel URL in production
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",

	collections: [Users, Pages, Media],
	globals: [Homepage, MainMenu, QuemSomos, Inscricoes, Contactos],

	editor: lexicalEditor(),

	secret: process.env.PAYLOAD_SECRET || "",

	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},

	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URL || "", // Changed from DATABASE_URI to DATABASE_URL
			// Adjusted pool settings for Vercel serverless
			max: 10, // Increased from 1 for better performance
			min: 0,
			idleTimeoutMillis: 10000, // Increased from 500
			connectionTimeoutMillis: 10000, // Increased from 5000
		},
	}),

	sharp,

	plugins: [
		...(process.env.SUPABASE_STORAGE_URL
			? [
					s3Storage({
						collections: {
							media: true, // Or Media.slug if you're importing it
						},
						bucket: "media", // Your bucket name in Supabase
						config: {
							credentials: {
								accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID || "",
								secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY || "",
							},
							endpoint: process.env.SUPABASE_STORAGE_URL,
							region: "us-east-1", // Required but not actually used by Supabase
							forcePathStyle: true, // Required for S3-compatible services
						},
					}),
				]
			: []),
	],

	// GraphQL is optional - remove if not needed
	// graphQL: {
	//   schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
	// },

	// CORS configuration for API routes
	cors: ["http://localhost:3000", process.env.NEXT_PUBLIC_SERVER_URL || ""].filter(Boolean),

	// CSRF protection
	csrf: ["http://localhost:3000", process.env.NEXT_PUBLIC_SERVER_URL || ""].filter(Boolean),

	// Rate limiting for production
	rateLimit: {
		window: 90000, // 90 seconds
		max: 500, // limit each IP to 500 requests per windowMs
		trustProxy: true, // Enable if behind a proxy (Vercel is)
	},

	// Upload limits
	upload: {
		limits: {
			fileSize: 5000000, // 5MB, adjust as needed
		},
	},
});

export default config;
