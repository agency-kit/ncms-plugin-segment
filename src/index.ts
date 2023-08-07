import type { CMS, ExtendedPageContent } from '@agency-kit/notion-cms'
import NotionCMS from '@agency-kit/notion-cms'

export default function ({ keepRules }: { keepRules: boolean } = { keepRules: false }) {
  return {
    name: 'ncms-plugin-segment',
    hook: 'post-tree', // Must happen at the end to maintain any previous plugin transformations
    exec: (context: CMS) => {
      const copyOfContext = structuredClone(context)
      const cmsWalker = NotionCMS._createCMSWalker((node: PluginSegmentPageContent) => {
        const splitContent = node.content?.html?.split('<hr>') || []
        node.sections = splitContent.length === 1 ? [] : splitContent
        if (keepRules && node.sections.length > 1) {
          node.sections = node.sections
            .map((section: string, i: number) => {
              if (node.sections?.length && i < node.sections.length - 1)
                return section = `${section}<hr>`
              return section
            })
        }
      })
      cmsWalker.walk(copyOfContext)
      return copyOfContext
    },
  }
}

export interface PluginSegmentPageContent extends ExtendedPageContent {
  sections?: Array<string>
}
