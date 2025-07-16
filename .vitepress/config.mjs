import { defineConfig } from 'vitepress'
import {set_sidebar} from "./utils/auto_siderbar.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "/知识库选中.png" }]],
  title: "Eason的编程日记",
  description: "A VitePress Site",
  themeConfig: {
    outline: [2,6],
    outlineTitle: '目录',
    logo: '/知识库选中.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '九股文', items: [
          { text: 'Java基础', link: '/backend/java/java基础.md' },
          { text: 'MySQL', link: '/backend/mysql/mysql基础.md'},
          {text: 'Redis', link: '/backend/Redis/基础.md'},
        ]},
      { text: '学习路线', link: '/学习路线.md' },
      { text: '数据结构与算法', link:'' },
      { text:"🔥AI大模型相关🔥",link: '/bigModel/RAG 概念.md'},
      {text:"关于作者", link:'/about.md'}
    ],


    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    sidebar: {
      "/backend/Redis": set_sidebar("/backend/Redis"),
      "/backend/mysql": set_sidebar("/backend/mysql"),
      "/backend/java": set_sidebar("/backend/java"),
      "/bigModel": set_sidebar("/bigModel"),

    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Eason'
    },
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  }
})
