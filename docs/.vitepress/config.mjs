import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/notes/",
  lang: "zh-CN",
  title: "沙漠之舟",
  description: "一个基于vitepress的CS编程笔记网站",
  head: [["link", { rel: "icon", href: "/Blog/logo.svg" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [2, 6],
    logo: "/logo.svg",
    // 头部的导航栏
    nav: [
      { text: "首页", link: "/" },
      { text: "前端手册", link: "/Frontend/" },
      { text: "人工智能", link: "/AI/" },
      { text: "鸿蒙开发", link: "/HarmonyOS/" },
      { text: "Java手册", link: "/Java/" },
      { text: "项目库", link: "/Project/" },
      // { text: "Examples", link: "/Examples/" },
    ],
    // 设置搜索框的样式
    search: {
      provider: "local",
      // options: {
      //   translations: {
      //     button: {
      //       buttonText: "搜索文档",
      //       buttonAriaLabel: "搜索文档",
      //     },
      //     modal: {
      //       noResultsText: "无法找到相关结果",
      //       resetButtonTitle: "清除查询条件",
      //       footer: {
      //         selectText: "选择",
      //         navigateText: "切换",
      //       },
      //     },
      //   },
      // },
    },
    sidebar: {
      Frontend: [
        {
          text: "学习笔记",
          items: [
            { text: "网站开发概览", link: "/Frontend/网站开发概览" },
            { text: "CSS核心原理", link: "/Frontend/CSS核心原理" },
            { text: "JavaScript核心篇", link: "/Frontend/JavaScript核心篇" },
            { text: "Node.js入门篇", link: "/Frontend/Node入门" },
            { text: "Node.js核心篇", link: "/Frontend/Node核心" },
          ],
        },
        {
          text: "参考资源",
          items: [{ text: "参考资源", link: "/Frontend/参考资源" }],
        },
      ],
      AI: [
        {
          text: "学习笔记",
          items: [
            { text: "论文精读", link: "/AI/论文精读" },
            { text: "MetaGPT", link: "/AI/MetaGPT" },
          ],
        },
        {
          text: "参考资源",
          items: [{ text: "参考资源", link: "/AI/参考资源" }],
        },
      ],
      HarmonyOS: [
        {
          text: "学习笔记",
          items: [
            { text: "回顾TypeScript", link: "/HarmonyOS/TypeScript回顾" },
            { text: "HarmonyOS入门", link: "/HarmonyOS/HarmonyOS入门" },
          ],
        },
        {
          text: "参考资源",
          items: [{ text: "参考资源", link: "/HarmonyOS/参考资源" }],
        },
      ],
      Java: [
        {
          text: "学习笔记",
          items: [
            { text: "Maven基础篇", link: "/Java/maven基础篇" },
            { text: "Spring基础", link: "/Java/spring基础" },
          ],
        },
        {
          text: "参考资源",
          items: [{ text: "参考资源", link: "/Java/参考资源" }],
        },
      ],
      Examples: [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/Examples/markdown-examples" },
            { text: "Runtime API Examples", link: "/Examples/api-examples" },
          ],
        },
      ],
    },

    // 右上角社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/whitevenus" }],
    // 非文档页的页脚显示
    footer: {
      // message: "Released under the MIT License.",
      copyright: "Copyright © 2024 WhiteVenus",
    },
  },
  // 开启数学公式
  markdown: {
    math: true,
  },
});
