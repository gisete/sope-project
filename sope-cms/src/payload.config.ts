// sope-cms/src/payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Homepage } from './globals/Homepage'
import { MainMenu } from './globals/MainMenu'
import { QuemSomos } from './globals/QuemSomos'
import { Inscricoes } from './globals/Inscricoes'
import { Contactos } from './globals/Contactos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'sope-cms.vercel.app',
  collections: [Users, Pages, Media],
  globals: [Homepage, MainMenu, QuemSomos, Inscricoes, Contactos],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      max: 1, // Limit connections per function
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
