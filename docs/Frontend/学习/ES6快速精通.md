# ECMAScript6新特性

ECMAScript 6.0（简称ES6）是2015年6月发布的JavaScript语言的下一代标准。其目标是将JavaScript语言变为可以用来编写复杂大型应用的企业级编程语言。

## ECMAScript 6简介

### ECMAScript和JavaScript的关系

ECMAScript和JavaScript二者的关系是：前者是后者的规范，后者是前者的一种实现（另外的ECMAScript方言有JScript和ActionScript）。

### Babel转码器

Babel是一个广泛使用的ES6转码器，主要用于将ES6代码转换为ES5代码，从而在老版本的浏览器上执行。下面是一个例子：

```javascript
// 转码前
input.map((item) => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```

Babel将箭头函数转为普通函数从而在不支持箭头函数的JavaScript环境下执行。

#### 安装Babel

在项目目录中安装Babel的指令：

```bash
npm install --save-dev @babel/core
```

#### 配置.babelrc

Babel的配置文件是`.babelrc`，存放在项目的根目录下。该文件用来设置转码规则和插件等，基本格式如下：

```js
{
  	"presets": [],
    "plugins": []
}
```

`presets`字段设定转码规则，官方提供以下规则集：

```bash
# 最新转码规则
npm install --save-dev @babel/preset-env

# react转码规则
npm install --save-dev @babel/preset-react
```

安装完成以后在`.babelrc`中添加规则集（以最新转码规则集为例）：

```js
{
  	"presets": ["@babel/env"],
    "plugins": []
}
```

#### 命令行转码

Babel提供命令行工具`@babel/cli`用于命令行转码。安装命令如下：

```bash
npm install --save-dev @babel/cli
```

基本用法如下：

```bash
# 转码结果输出到标准输出
npx babel example.js

# 转码结果写入一个文件
npx babel example.js --out-file compiled.js
# 或者
npx babel example.js -o compiled.js

# 整个目录转码
npx babel src --out-dir lib
# 或者
npx babel src -d lib

# -s参数生成source map 文件
npx babel src -d lib -s
```

## let 和 const 命令

### let 命令

#### 基本用法

ES6新增了let命令，用来声明变量。用法类似于`var`，但其所声明的变量只在所声明的代码块（当前作用域）中有效。也就是说`let`的作用域是**块级作用域**，而`var`的作用域是**函数级作用域**。

```js
{
  var a = 1;
  let b = 2;
}
console.log(a); // 1
console.log(b); // ReferenceError: b is not defined.
```

let 声明很适合用在 for 循环中：

```js
for (let i = 0; i < 10; i++) {
  console.log(i);
}
console.log(i); // ReferenceError: i is not defined
```

上面代码中，计数器`i`只在`for`循环体内有效，在循环体外引用就会报错。

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[3](); // 期望 3，实际 10
// var声明的变量i是全局范围有效的，因此最后console.log(i)时,输出最后的i值，即10.

var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[3](); // 3
// let声明的变量i是块级作用域，只在本轮循环有效，因此每次循环i都是一个新的变量。
```

> 如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？
>
> + 这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

另外，`for`循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

上面代码正确运行，输出了 3 次`abc`。这表明函数内部的变量`i`与循环变量`i`不在同一个作用域，有各自单独的作用域（同一个作用域不可使用 `let` 重复声明同一个变量）。

#### 应用场景

**Tab切换**

#### 暂时性死区

ES6 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

```js
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

#### 不允许重复声明

`let`不允许在相同作用域内，重复声明同一个变量。

```js
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}

function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错
```

### const 命令

`const`声明一个只读的常量。一旦声明，常量的值就不能改变。这意味着，`const`一旦声明变量，就必须立即初始化，不能留到以后赋值。另外`const`在暂时性死区、不允许重复声明等方面具有和`let`同样的规定。

```js
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

## 变量的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

### 数组的解构赋值

以前，为变量赋值，只能直接指定值。

```js
let a = 1;
let b = 2;
let c = 3;
```

ES6 允许写成下面这样。

```js
let [a, b, c] = [1, 2, 3];
```

上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

解构赋值允许指定默认值。

```js
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

注意，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，只有当一个数组成员严格等于`undefined`，默认值才会生效。

```js
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```js
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

### 对象的解构赋值

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。如果解构失败，变量的值等于`undefined`。

```js
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```js
// 例一
let { log, sin, cos } = Math;

// 例二
const { log } = console;
log('hello') // hello
```

如果变量名与属性名不一致，必须写成下面这样。

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

### 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length : len} = 'hello';
len // 5
```





