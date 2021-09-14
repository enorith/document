import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

import * as sidebar from './configs/sidebar'

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig<DefaultThemeOptions>({
    base: "/",
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Enorith',
            description: 'A golang framework for web artisan',
        },
    },
    themeConfig: {
        repo: "enorith/enorith",
        docsRepo: "enorith/document",
        docsBranch: "master",
        docsDir: "docs",
        sidebar: sidebar.en
    }
})