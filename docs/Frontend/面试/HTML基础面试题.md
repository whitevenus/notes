# HTML基础面试题

## `DOCTYPE`的作用

::: details 点我查看答案

`DOCTYPE` 全称 *Document Type (文档类型)* , 主要作用是告诉浏览器如何解析渲染当前文档。必须声明在第一行，通常为了以更标准的方式呈现网页，都会将`DOCTYPE`声明为`html` ，这表示浏览器将以**标准模式**解析渲染该文档。

```html
<!DOCTYPE html>
```

:::

::: tip 扩展阅读

在以前的网络上，页面通常有为网景公司的 *Navigator* 及微软公司的 *Internet Explorer* 准备的两种版本。而当W3C提出网络标准后，为了不破坏当时已有的网站，浏览器采用了两种模式渲染模式用来把符合新规范的网页和老旧网页区分开，这两种模式分别是：**怪异模式（Quirks mode）**和**标准模式（Standards mode）。**

- 在**怪异模式**下，排版会模拟Navigator 4和Internet Explorer 5的非标准行为。
- 在**标准模式**下，排版完全由HTML和CSS的规范描述所决定。

了解更多请阅读：[Activating Browser Modes with Doctype](https://hsivonen.fi/doctype/)

:::

## `src` 和`href` 的区别

::: details 点我查看答案

`src`和`href`都是用于引用外部资源的，概括来说`src`是**替换外部资源到当前元素位置**，而`href`是**建立当前元素与外部资源的联系**。

+ `src`全称*source*，表示资源。浏览器在请求`src`指向的外部资源时，会将其下载应用到当前文档内；例如**js脚本**、**img图片**、**frame元素**等等。更详细地讲，浏览器在遇到带有`src`属性的元素时，会**暂停**解析渲染当前文档，直到`src`所指向的资源文件被**加载、编译、执行完毕**。这正是为什么要将加载js脚本的`script`标签放在`body`中而不是`html`中。
+ `href`全称*Hypertext Reference*，表示超文本引用。当浏览器遇到带有`href`属性的元素（例如`a`、`link`等等）时，浏览器会**并行下载**其所指向的网络资源，**不会暂停**对当前文档的解析渲染。

:::

## 块级元素、行内元素和空标签

::: details 点我查看答案

元素通常被分为**块级元素**和**行内元素**两类。

+ 块级元素默认占据一个独立的区域，在网页中会另起一行显示，占据100%的宽度。块级元素内可以包含行内元素以及块级元素。常见的块级元素有：`div`、`p`、`h1~h6`、`ul`、`ol`、`li`等等。
+ 行内元素默认与其他元素在同一行，不产生换行，宽度只与内容有关，只能容纳文本或者其他行内元素。常见的行内元素有：`span`、`em`、`strong`、`input`、`select`等等。
+ 空标签指的是没有内容的HTML标签，例如`br`、`hr`、`meta`、`link`等等。

:::

## 对HTML语义化的理解

::: details 点我查看答案

HTML语义化指的是只看标签就知道该元素的实际意义，只阅读源码就能够知晓网页结构。就是一种更好的规范，编码时要依据网页内容的结构选择合适的标签。

HTML语义化带来的优点有：

+ 增强代码可读性，便于维护
+ 对机器友好，有利于SEO

+ 增强可访问性，有利于屏幕阅读器更好地识别网页结构

常见的HTML语义化标签有：

+ `header`、`footer`：分别用于表示整个**网页**、整篇**文章**或一个**区块**的头部和尾部。
+ `main`：表示页面的**主体内容**，一个页面只能有一个。通常来说功能性区块（例如搜索栏）不适合放入该标签内。
+ `nav`：用于放置页面或文章的导航信息。
+ `aside`：通常用于放置与**网页**或**文章**主要内容**间接相关**的补充信息。
+ `section`、`article`：表示一个独立的部分。没有固定的语义信息，但通常情况下，`article`用于表示一篇文章、`section`用于表示一个含有主题的独立部分，例如一个章节。
+ `h1~h6`：表示标题信息。
+ `hgroup`：若是主标题包含多级标题（例如带有副标题），可以使用该标签包裹起来表示标题组。
+ `adress`：表示作者、相关人士、组织的联系信息。

:::

## `meta`标签

::: details 点我查看答案

`meta`标签表示设置和说明网页的**元数据**，用于描述网页文档的属性，例如作者、网页描述信息、网页关键字等等。该标签必须放在`head`标签内，一个`meta`标签就是一项元数据，通常约定`meta`标签放置在`head`标签内容的最前面。

常见的`meta`标签属性：

+ **charset属性**：用来指定网页的编码方式，声明的编码应与网页实际编码一致，如果设置的不正确，浏览器可能无法正确解码，网页就会乱码显示。

  ```html
  <meta charset="UTF-8" >
  ```

+ **name/content**属性：**name**表示元数据的名字，**content**表示元数据的值；它们合在一起为网页指定一项元数据。例如：

  ```html
  <!-- 网页描述信息 -->
  <meta name="description" content="HTML 语言入门">
  <!-- 网页关键字 -->
  <meta name="keywords" content="HTML,教程">
  <!-- 网页作者 -->
  <meta name="author" content="张三">
  <!-- 移动端适配 -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <!-- 搜索引擎索引方式 -->
  <meta name="robots" content="index,follow" />
  ```

  当然除了HTTP标准固定了一些**name**作为大家使用的共识，开发者还可以自定义name。

+ **http-equiv/content属性**：`http-equiv`属性用来补充HTTP回应的头信息字段。例如：

  ```html
  <meta http-equiv="Content-Type" content="Type=text/html; charset=utf-8">
  <meta http-equiv="refresh" content="30">
  <meta http-equiv="refresh" content="30;URL='http://website.com'">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
  ```

:::

