import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "沙漠之舟",
  description: "A web site about my study note power on vitepress",
  head: [["link", { rel: "icon", href: "/public/logo.svg" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: "/public/logo.svg",
    nav: [
      { text: "首页", link: "/" },
      { text: "前端手册", link: "/Frontend/" },
      { text: "人工智能", link: "/AI/" },
      // { text: "算法与数据结构", link: "/markdown-examples" },
      { text: "Java手册", link: "/Java/" },
      { text: "项目库", link: "/Project/" },
      // { text: "Examples", link: "/Examples/" },
    ],

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
          items: [{ text: "MetaGPT", link: "/AI/MetaGPT" }],
        },
        {
          text: "参考资源",
          items: [{ text: "参考资源", link: "/AI/参考资源" }],
        },
      ],
      Java: [
        {
          text: "学习笔记",
          items: [
            { text: "网站开发概览", link: "/Frontend/网站开发概览" },
            { text: "JavaScript核心篇", link: "/Frontend/JavaScript核心篇" },
          ],
        },
        {
          text: "参考资源",
          items: [{ text: "参考资源", link: "/Frontend/参考资源" }],
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

    socialLinks: [{ icon: "github", link: "https://github.com/whitevenus" }],
  },
});
