import NotionCMS from '@agency-kit/notion-cms'
import dotenv from 'dotenv'
import ncmsSegmentPlugin from '../dist/index.mjs'

dotenv.config()

const testCMS = new NotionCMS({
  databaseId: '3ae516b8-9115-4233-9e25-0e019933fa95',
  notionAPIKey: process.env.NOTION,
  draftMode: true,
  refreshTimeout: 0,
  debug: true,
  plugins: [
    ncmsSegmentPlugin({ keepRules: true }),
  ],
})

await testCMS.fetch()

testCMS.export({ pretty: true, path: `${process.cwd()}/debug/tree.json` })
