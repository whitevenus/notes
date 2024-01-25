`TypeScript`是`JavaScript`语言的一个超集，是通过在JavaScript的基础上**添加静态类型定义**构建而成一门开源编程语言。

## 基本语法

### 变量声明和数据类型

TypeScript是基于`JavaScript`的，其在JavaScript基础之上加入了静态类型检查功能，这意味着`TypeScript`中的每一个变量都有固定的数据类型，这也改变了`JavaScript`**弱类型**的语言特性，获得了同`Java`等语言一样的**强类型**特点。

在`JavaScript`声明一个变量的形式如下：

```js
let info = "Hello world";
```

而在`TypeScript`中声明相同的一个变量形式是：

```ts
let info: string = "Hello World";
```

除了`string`（字符串类型，使用**单引号**或**双引号**表示的文本数据）以外，**TypeScript**还支持如下数据类型：

+ `number`：数值类型，TypeScript中的所有数字都是浮点数。除了支持十进制，还支持以`0b`、`0o`、`0x`为首的二进制、八进制、十六进制形式数字。

+ `boolean`：布尔类型，可以赋值为`true`或`false`。

+ `unknown`：当不确定该变量的具体数据类时，可以使用`unknown`类型标记该变量。

  ```ts
  let notSure: unknown = 4;
  notSure = "Hello";
  notSure = true;
  ```

+ `void`：通常用于表示函数没有返回值。

  ```ts
  function test(): void {
    console.log("This is a void function.")
  }
  ```

+ `undefined`和`null`：在typescript中，undefined和null分别有各自的数据类型。

  ```ts
  let u: undefined = undefined;
  let n: null = null;
  ```

+ `联合类型`：使用`|`隔开指定的不同数据类型，表示类型可以是指定数据类型中的任何一种

  ```ts
  let myNumber: string | number;
  myNumber = 7;
  myNumber = 'Seven'
  ```

+ `any`：不确定类型，即可以是任意类型，编译器不会做类型检查工作

+ `对象类型`：直接将具体对象赋值给变量即可，无需显示声明

  ```ts
  let obj = {name: "Venus", age: 18}
  ```

除了上述最常见的数据类型以外，**TypeScript**还支持一些容器，例如**数组**、**Map**、**Set**等等：

+ 下面是声明**数组**的两种不同方式：

  ```ts
  let names: Array<String> = ['John', 'Alex'];
  let ages: number[] = [19, 31];
  ```

+ **元组**：用于表示已知元素数量和类型的数组，各元素类型不必相同。

  ```ts
  let tuple: [string, number];
  tuple = ['hello', 21];	//OK
  tuple = [21, 'hello'];	//Error
  ```

+ **枚举**：是对javascript标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名称。

  ```ts
  enum Color {Red, Green, Blue};
  let greenColor: Color = Color.Green;
  ```

### 条件控制

**TypeScript**同大多数编程语言一样，支持基于`if-else if-else`和`switch-case`两种分支结构。

::: code-group 

```ts [if-else if-else] 
let num: number = 18;
if (num > 0) {
  console.log(num + " 是正数.");
} else if (num < 0) {
  console.log(num + " 是负数.");
} else {
  console.log(num + " 是0.");
}
```

  ```ts [switch-case] 
  let grade: string = 'A';
  switch (grade) {
    case 'A':
      console.log("优秀");
      break;
    case 'B':
      console.log("合格");
      break;
    case 'C':
      console.log("不合格");
      break;
    default:
      console.log("错误输入!");
      break;
  }
  ```

:::

### 循环迭代

**TypeScript**支持`for`和`while`循环，这里就不举例了。`TypeScript`还为一些内置类型（如`Array`、`String`、`Map`等）提供了快捷的迭代方法：`for ... of`语句和`for ... in`语句。事实上只要一个对象实现了`Symbol.iterator`属性，就可以使用快捷的迭代方法完成对该对象的遍历。以数组为例：

```ts
let names: string[] = ['John', 'Alex', 'Rose'];

// for in 迭代器：对数组中的下标进行遍历
for (const i in names) {
  console.log(i + ":" + names[i])
}

// for of 迭代器：对数组中元素进行遍历
for (const name of names) {
  console.log(name);
}
```

### 函数

在**TypeScript**中使用`function`关键字声明函数，并且支持可选参数、默认参数、剩余参数、箭头函数等特殊特性。

```ts
// 无返回值函数, void可以省略
function sayHello(name: string): void {
  console.log("Hello, " + name);
}

// 有返回值函数
function sum(num1: number, num2: number): number {
  return num1 + num2;
}

// 匿名函数
let myAdd = function(x: number, y: number): number {
  return x + y;
}

// 箭头函数：匿名函数的简写形式，省略了function关键字
let sayHi = (name: String) => {
  console.log("Hi, " + name);
}

// 可选参数
function welcome(name?: string) {
  name = name ? name : "陌生人";
  console.log("你好", name);
}

// 默认参数
function sayNice(name: string = "陌生人") {
  console.log("Nice! " + name);
}

// 剩余参数: 个数不限的可选参数，可以有0个或任意多个
function getEmployeeName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ")
}
```

### 面向对象OOP

**TypeScript**具备面向对象编程的基本语法，例如`interface`、`class`等等，同样具备面向对象的三个基本特征：**封装**、**继承**、**多态**。

::: code-group

 ```ts [枚举、接口、多态]
 // 定义枚举
 enum Msg {
   // 枚举变量的默认值是数字，从0开始。
   HI = "hi",  // 给枚举变量赋值时不需要指定数据类型。
   HELLO = "Hello"
 }
 
 // 定义接口
 interface IFACE {
   // 接口中的抽象方法不需要使用function关键字声明
   say(msg: Msg): void;
 }
 
 // 实现接口
 class Clazz implements IFACE {
   say(msg: Msg): void {
     console.log(msg + ", I am a class.")
   }
 }
 
 // 初始化对象
 let obj: IFACE = new Clazz();
 obj.say(Msg.HI);
 ```

```ts [类的封装、继承]
class Rectangle {
  // 成员变量
  private width: number;
  private height: number;
  
  // 构造方法
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  
  // 公有方法
  public getArea(): number {
    return this.width * this.height;
  }
}

// 继承：使子类具有和父类相同的行为
class Square extends Rectangle {
  constructor(side: number) {
    super(side, side);
  }
}

let square = new Square(10);
console.log("正方形面积为：" + square.getArea());
```

:::

### 模块化开发

应用程序复杂时，我们通常可以将不同的功能放在单独的`ts`文件中，每个文件都作为一个模块，模块之间可以互相加载（通过`export`和`import`指令），从而达到更好的**组织代码**，提高代码复用性。

::: code-group

```ts [rectangle.ts]
// 导出类
export class Rectangle {
  public width: number;
  public height: number;
  
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

// 导出函数
export function getArea(rec: Rectangle): number {
    return rec.width * rec.height;
}
```

```ts [index.ts]
// 通过import语法导入rectangle.ts文件中导出的功能资源
import {Rectangle, getArea} from "./rectangle";

let rec = new Rectangle(10, 20);
console.log("面积为:" + getArea(rec));
```

:::