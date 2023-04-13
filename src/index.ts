import type { PageContent } from '@agency-kit/notion-cms'

export default function ({ keepRules }: { keepRules: boolean } = { keepRules: false }) {
  return {
    name: 'ncms-plugin-segment',
    hook: 'during-tree',
    exec: (context: PageContent) => {
      const copyOfContext = structuredClone(context) as PluginSegmentPageContent
      const splitContent = copyOfContext.content?.split('<hr>') || []
      copyOfContext.sections = splitContent.length === 1 ? [] : splitContent
      if (keepRules && copyOfContext.sections.length > 1) {
        copyOfContext.sections = copyOfContext.sections
          .map((section: string, i: number) => {
            if (i < copyOfContext.sections.length - 1)
              return section = `${section}<hr>`
            return section
          })
      }
      return copyOfContext
    },
  }
}

export interface PluginSegmentPageContent extends PageContent {
  sections: Array<string>
}
