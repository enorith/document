
import type { SidebarConfig } from '@vuepress/theme-default'


export const en: SidebarConfig = {
    '/': [
        {
            text: 'Introduction',
            children: [
                '/introduction/about.md',
            ],
        },
        {
            text: 'Guide',
            children: [
                '/guide/getting-started.md',
            ],
        },
    ],
}