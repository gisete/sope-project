/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from "next";

import config from "@/payload.config";
import { NotFoundPage, generatePageMetadata } from "@payloadcms/next/views";

export const generateMetadata = (): Promise<Metadata> => generatePageMetadata({ config });

const NotFound = () => NotFoundPage({ config });

export default NotFound;
