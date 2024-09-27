import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'

import * as sidebar from './configs/sidebar'

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig({
    bundler: viteBundler(),
    theme: defaultTheme({
        repo: "enorith/enorith",
        docsRepo: "enorith/document",
        docsBranch: "master",
        docsDir: "docs",
        sidebar: sidebar.zhCN,
        home: "/",
        locales : {
            '/en': {
                selectLanguageName: 'English',
                selectLanguageText: "Languages",
                home: '/en/home',
            },
            '/': {
                selectLanguageName: '简体中文',
                selectLanguageText: "选择语言",
                home: '/',
            }
        }
    }),
    base: "/",
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'Enorith',
            description: 'A golang framework for web artisan',
        },
        '/en': {
            lang: 'en-US',
            title: 'Enorith',
            description: 'A golang framework for web artisan',
        },
    }
})