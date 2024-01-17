## 前置知识

- [Maven 基础](./maven基础篇)
- Java 基础（Java 反射、Java 注解等）
- JavaWeb

## 引言

软件系统设计模式中有两个基础原则：`OCP（Open Closed Principle）原则`和`DIP（Dependence Inversion Principle）原则`。依附这些基础原则，我们更有可能建立一个稳定的、灵活的软件系统，而不是一个糟糕的，维护困难的系统。可以说**不违背这些基础原则是软件开发中必须要做的事情**。

### 1. OCP（Open Closed Principle）原则：开闭原则

开闭原则说的是一个软件系统应该通过扩展进行变化，而不是通过修改源代码实现变化。也就是`对扩展开放，对修改关闭`。

如果因为要增加系统功能而修改源代码，这就违背了 OCP 原则，可以想象一下修改源代码以后还要再次测试以前的所有代码所带来的繁琐体验。

而一个符合 OCP 原则的软件系统指的是：当用户有新的需求时，只需要新增功能代码就可以满足用户，整个过程对已上线的软件系统毫无影响，不需要修改原有的代码。

### 2. DIP（Dependence Inversion Principle）原则：依赖倒置原则

依赖倒置原则要求`面向抽象编程，面向接口编程，而不是面向具体编程`。让上层（例如 MVC 架构中的 Service 层）不要依赖下层（例如 MVC 架构中的 Dao 层），这样就能够降低程序的耦合性，耦合度低了，扩展性就提高了。

当下层发生变动，上层就要受到牵连，这就违背了 DIP 原则。

- 学习 Javaweb 时，我们的代码是这样的：
  ```java
  package com.mwt.spring6.service.impl;

  import com.mwt.spring6.dao.UserDao;
  import com.mwt.spring6.dao.impl.UserDaoImplForMySQL;
  import com.mwt.spring6.dao.impl.UserDaoImplForOracle;
  import com.mwt.spring6.service.UserService;

  public class UserServiceImpl implements UserService {

  //    private UserDao userDao = new UserDaoImplForOracle();

      private UserDao userDao = new UserDaoImplForMySQL();

      @Override
      public void deleteUser() {
          // 调用持久层方法
          userDao.deleteById();
      }
  }
  ```

这时如果需要添加新功能时，就需要修改源代码，并且由于业务层高度依赖持久化层，当持久化层发生改变时，就需要修改业务层代码。这就违背了上面的两个原则。

> 那怎么样可以不违背这两个原则呢？答案就是`控制反转（Inverse of Control）`。

### 3. IoC：控制反转

控制反转是一种`编程思想`，也可以说是一种`设计模式`。其本质就是将对象的**创建权**以及对象之间**关系的维护权**交给第三方容器进行自动管理。主要目的就是为了降低代码之间的耦合度，提高程序扩展性。

实现控制反转的主要方式是：`依赖注入（Dependency Injection，DI）`，通常实现依赖注入主要包含两种方式：

- `Set注入`：通过 Set 方法给属性赋值
- `构造器注入`：通过构造方法给属性赋值

而 Spring 框架就是一个实现了 IoC 控制反转这种思想的第三方容器。

## 1 概述

### 1. Spring 是什么？

Spring 是一个`轻量级`的、`开源`的、`主流的`的 JavaEE 框架，它的基本使命是`简化企业级Java应用的开发难度和开发周期`。另外 Spring 框架除了自己提供功能外，还提供整合其他技术和框架的能力。

- [Spring 官网](https://spring.io/)
- [Spring GitHub 地址](https://github.com/spring-projects/spring-framework)

### 2. Spring 划分方式

- **广义上的 Spring**：泛指以`Spring Framework`为核心的 Spring 技术栈。

- **狭义上的 Spring**：特指`Spring Framework 框架`。其内部有两个核心模块：`IOC`和`AOP`。
  - **IOC**：Inverse of Control，控制反转，把对象的创建权和对象间关系的维护权交给 Spring 进行管理。
  - **AOP**：Aspect Oriented Programming，面向切面编程， AOP 通过封装多个类的**公共行为（与业务无关，业务模块所共同调用的逻辑功能）**，`提高代码重用性，降低耦合度`。通过 AOP 可以在很少改变源代码的情况下，增加一个功能，比如增加日志、事务、权限等功能。能够使得开发人员专注于核心业务逻辑的开发，尽可能地不再关注非核心业务逻辑代码（比如日志、事务控制等等）。

### 3. Spring Framework 的特点

- `非侵入式`：使用 Spring Framework 开发应用程序时，对应用程序本身的结构影响非常小，几乎可以做到**”零污染“**，只需对功能性组建使用几个简单的注解进行标记即可。
- `控制反转`：反转资源获取方向，把**自己创建资源，向环境索取资源**变成**环境将资源（对象）准备好，我们直接享受资源注入**即可。
- `面向切面编程`：实现在**不修改源代码的基础上增强代码功能**。
- `容器`：Spring IOC 是一个容器，**包含并且管理组件对象的生命周期**。实现对对象资源的容器化管理。
- `组件化`：Spring 实现了使用**简单的组件配置组合成一个复杂的应用**，只需要使用 XML 或 Java 注解组合这些组件对象即可。类似于砖块、砂浆、木材、管道等等组合在一起，形成一栋房子。
- `一站式`：Spring 旗下的**项目覆盖领域非常广泛**，很多功能需求都可以在 Spring Framework 的基础上配合 Spring 其他模块实现。

### 4. Spring 模块组成

![Spring模块组成1](./images/spring6/Spring模块组成.png)

- Spring 各个模块之间的依赖关系
  ![Spring模块组成2](./images/spring6/Spring模块组成依赖关系.png)

1. **Core Container**：Spring 框架的核心模块，主要提供 IoC 依赖注入功能的支持。Spring 其他模块基本都需要依赖于该模块。

   - Spring-core：基本的核心工具类
   - Spring-beans: 提供对 Bean 的创建、装配管理等功能的支持。
   - Spring-context：提供对国际化（I18N）、事件传播等的支持。
   - Spring-expression：提供对 Spring 表达式语言的支持。

2. **Spring AOP**：

   - Spring-aop：提供面向切面的编程实现。
   - Spring-aspects：为与 AspectJ 的集成提供支持。
   - spring-instrument ：提供了为 JVM 添加代理（agent）的功能。

3. **Spring Data Access**：

   - spring-jdbc ：提供了对数据库访问的抽象 JDBC。不同的数据库都有自己独立的 API 用于操作数据库，而 Java 程序只需要和 JDBC API 交互，这样就屏蔽了数据库的影响。
   - spring-tx ：提供对事务的支持。
   - spring-orm ： 提供对 Hibernate、JPA 、iBatis 等 ORM 框架的支持。
   - spring-oxm ：提供一个抽象层支撑 OXM(Object-to-XML-Mapping)，例如：JAXB、Castor、XMLBeans、JiBX 和 XStream 等。
   - spring-jms : 消息服务。自 Spring Framework 4.1 以后，它还提供了对 spring-messaging 模块的继承。

4. **Spring Web**：

   - spring-web ：对 Web 功能的实现提供一些最基础的支持。
   - spring-webmvc ： 提供对 Spring MVC 的实现。
   - spring-websocket ： 提供了对 WebSocket 的支持，WebSocket 可以让客户端和服务端进行双向通信。
   - spring-webflux ：提供对 WebFlux 的支持。WebFlux 是 Spring Framework 5.0 中引入的新的响应式框架。与 Spring MVC 不同，它不需要 Servlet API，是完全异步。

5. **Spring Message**：

   - Spring-messaging：spring4.0 提供的，为 Spring 集成一些基础的报文传送服务。

6. **Spring test**：
   - Spring-test：集成测试支持，主要是对 Junit 等框架的封装支持。

## 2 容器 IoC

Spring 通过`IoC容器`（通常被称为 Spring 应用上下文，Spring application context）来创建和管理应用的组件，包括**管理所有 Java 对象的实例化和初始化**，**控制对象与对象之间的依赖关系**等等。我们将由 IoC 容器管理的组件称为`Spring Bean`，这些组件会在 Spring 应用上下文中装配在一起，从而形成一个完整的应用程序。

### 1. 控制反转

- 控制反转是一种`思想`。
- 控制反转是为了`降低程序耦合度`，`提高程序扩展力`。
- 控制反转
  - **控制**：指的是对象创建（实例化、管理）的权利。
  - **反转**：控制权交给第三方环境（Spring 框架、IOC 容器）
- 如何实现这种思想？
  - `DI（Dependency Injection）`：依赖注入

### 2. 依赖注入（基于 XML 管理 bean）

指的是**在 Spring 创建对象的过程中，将对象所依赖的属性通过配置进行注入**。使用依赖注入的应用依赖于单独的实体（容器）来创建和维护所有的组件，并将其注入到需要他们 `bean`(组件) 中。通常是通过构造器参数和属性访问方式来实现的。

`Bean管理`指的就是：**Bean 对象的创建**以及 **Bean 对象中属性的赋值（或者叫做 Bean 对象之间关系的维护）**。

- `Set注入`：通过`<bean>`标签中的`<property>`标签完成。属性必须提供`set`方法。
  ```xml
  <!-- set注入 -->
  <!-- 字面量注入 -->
  <bean id="book" class="com.mwt.spring6.iocxml.di.Book">
  <property name="name" value="前端开发"></property>
  <property name="author" value="mwt"></property>
  <!-- 空值注入 -->
  <!-- <property name="others"> -->
  <!--   <null /> -->
  <!-- </property> -->

      <!-- 特殊符号（<、>、'、"、&）注入 -->
      <!-- 第一种方法：通过使用转义字符表示尖角号 -->
      <!-- <property name="others" value="&lt; 其他 &gt;"></property>-->

      <!-- 第二种方法: 通过使用CDATA区实现注入 -->
          <property name="others">
              <value><![CDATA[a < b]]></value>
          </property>
      </bean>
      ```

  | 特殊符号 | 转义字符 |
  | -------- | -------- |
  | >        | `&gt;`   |
  | <        | `&lt;`   |
  | '        | `&apos;` |
  | "        | `&quot;` |
  | &        | `&amp;`  |

- `构造注入`：通过`<bean>`标签中的`<constructor-arg>`标签完成。
  ```xml
  <!-- 构造方法注入 -->
  <bean id="book1" class="com.mwt.spring6.iocxml.di.Book">
      <!-- constructor-arg标签还有另外一种属性对： index 和 value，index=0表示第一个参数，以此类推  -->
      <!-- constructor-arg标签中甚至可以不用指定name和index，spring自己就可以进行自动类型推断（根据类型判断将ref引用的bean组件注入到哪个属性上，类型一致就按顺序注入）-->
      <constructor-arg name="name" value="Java开发"></constructor-arg>
      <constructor-arg name="author" value="mwt"></constructor-arg>
  </bean>
  ```

假设在软件系统的众多组件中，有两个是需要我们处理的：`库存服务`和`商品服务`。其中商品服务依赖于库存服务。那这些 bean 和 Spring 应用上下文之间的关系就如下图所示：
![Spring上下文管理应用组件](./images/spring6/Spring%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AE%A1%E7%90%86%E7%BB%84%E4%BB%B6.png)

### 3. IoC 在 Spring 中的实现

Spring 的 IoC 容器就是 IoC 思想的一个落地产品实现。在创建 bean 之前，首先需要创建 IoC 容器。Spring 提供了 IoC 容器的两种实现方式：

- `BeanFactory`：这是 IoC 容器的基本实现，是 Spring 内部使用的接口。面向 Spring 本身，不提供给开发人员使用。

- `ApplicationContext`：BeanFactory 的子接口，提供了更多高级特性。面向 Spring 的使用者，几乎所有场合都使用 ApplicationContext，而不是底层的 BeanFactory。

- `ApplicationContext`的主要内容：
  | 类型名 | 简介 |
  | --- | --- |
  | ClassPathXmlApplicationContext | 通过读取**类路径**下的 XML 格式的配置文件创建 IOC 容器对象 |
  | FileSystemXmlApplicationContext | 通过**文件系统路径**读取 XML 格式的配置文件创建 IOC 容器对象 |
  | ConfigurableApplicationContext | ApplicationContext 的子接口，包含一些扩展方法 refresh() 和 close()，让 ApplicationContext 具有启动、关闭和刷新上下文的能力|
  | WebApplicationContext | 专门为 Web 应用准备，基于 Web 环境创建 IOC 容器对象，并将对象引入 ServletContext 域中|

- Spring 中的 `jar` 文件（）：
  | JAR 文件 | 描述 |
  | --- | --- |
  | spring-aop-5.3.9.jar | **这个 jar 文件包含在应用中使用 Spring 的 AOP 特性时所需的类** |
  | spring-aspects-5.3.9.jar | **提供对 AspectJ 的支持，以便可以方便的将面向切面的功能集成进 IDE 中** |
  | spring-beans-5.3.9.jar | **这个 jar 文件是所有应用都要用到的，它包含访问配置文件、创建和管理 bean 以及进行 Inversion of Control / Dependency Injection（IoC/DI）操作相关的所有类。如果应用只需基本的 IoC/DI 支持，引入 spring-core.jar 及 spring-beans.jar 文件就可以了。** |
  | spring-context-5.3.9.jar | **这个 jar 文件为 Spring 核心提供了大量扩展。可以找到使用 Spring ApplicationContext 特性时所需的全部类，JDNI 所需的全部类，instrumentation 组件以及校验 Validation 方面的相关类。** |
  | spring-context-indexer-5.3.9.jar | 虽然类路径扫描非常快，但是 Spring 内部存在大量的类，添加此依赖，可以通过在编译时创建候选对象的静态列表来提高大型应用程序的启动性能。 |
  | spring-context-support-5.3.9.jar | 用来提供 Spring 上下文的一些扩展模块,例如实现邮件服务、视图解析、缓存、定时任务调度等 |
  | spring-core-5.3.9.jar | **Spring 框架基本的核心工具类。Spring 其它组件要都要使用到这个包里的类，是其它组件的基本核心，当然你也可以在自己的应用系统中使用这些工具类。**|
  | spring-expression-5.3.9.jar| Spring 表达式语言。
  | spring-instrument-5.3.9.jar | Spring3.0 对服务器的代理接口。
  | spring-jcl-5.3.9.jar | Spring 的日志模块。JCL，全称为"Jakarta Commons Logging"，也可称为"Apache Commons Logging"。
  | spring-jdbc-5.3.9.jar | **Spring 对 JDBC 的支持。** |
  | spring-jms-5.3.9.jar | 这个 jar 包提供了对 JMS 1.0.2/1.1 的支持类。JMS 是 Java 消息服务。属于 JavaEE 规范之一。|
  | spring-messaging-5.3.9.jar | 为集成 messaging api 和消息协议提供支持. |
  | spring-orm-5.3.9.jar | **Spring 集成 ORM 框架的支持，比如集成 hibernate，mybatis 等。** |
  | spring-oxm-5.3.9.jar | 为主流 O/X Mapping 组件提供了统一层抽象和封装，OXM 是 Object Xml Mapping。对象和 XML 之间的相互转换。|
  | spring-r2dbc-5.3.9.jar | Reactive Relational Database Connectivity (关系型数据库的响应式连接) 的缩写。这个 jar 文件是 Spring 对 r2dbc 的支持。|
  | spring-test-5.3.9.jar | 对 Junit 等测试框架的简单封装。|
  | spring-tx-5.3.9.jar | **为 JDBC、Hibernate、JDO、JPA、Beans 等提供的一致的声明式和编程式事务管理支持。** |
  | spring-web-5.3.9.jar | **Spring 集成 MVC 框架的支持，比如集成 Struts 等。** |
  | spring-webflux-5.3.9.jar | **WebFlux 是 Spring5 添加的新模块，用于 web 的开发，功能和 SpringMVC 类似的，Webflux 使用当前一种比较流程响应式编程出现的框架。** |
  | spring-webmvc-5.3.9.jar | **SpringMVC 框架的类库** |
  | spring-websocket-5.3.9.jar | Spring 集成 WebSocket 框架时使用

**如果只是想用 Spring 的 IoC 功能，在 Maven 中仅需要引入：spring-context 即可。** Maven 会自动引入 `spring-core`、`spring-beans`、`spring-aop`、`spring-expression`。

```pom
<!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>6.0.7</version>
</dependency>
```

### 4. 简单类型注入

简单类型属性注入，使用`value`标签即可。Spring 支持的简单类型有哪些（在`BeanUtils`类中查看）？

- 基本数据类型
- 基本数据类型对应的包装类
- Enum 子类
- Number 子类
- String 或其他的 CharSequence 子类
- Date 子类：日期格式字符串不能随便写，必须符合`Data的toString方法`格式，所以就很鸡肋。实际开发中，一般不会把 Data 当作简单类型注入。
- Class
- Temporal（Java8 提供的时间和时区类型）子类
- URI
- URL
- Locale（语言类型）

### 5. 特殊类型注入

1. 对象类型属性注入

   - 引入外部 bean 的方式：通过`ref`属性引用外部`bean`的`id`属性即可。

     ```xml
     <!--
     第一种方式：引入外部bean
         1 创建两个类对象：dept 和 emp
         2 在emp的bean标签里面，使用property引入dept的bean
     -->
     <bean id="dept" class="com.mwt.spring6.iocxml.ditest.Dept">
         <property name="name" value="安保部"></property>
     </bean>

     <bean id="emp" class="com.mwt.spring6.iocxml.ditest.Emp">
         <!-- 普通类型属性注入 -->
         <property name="name" value="Lucy"></property>
         <property name="age" value="50"></property>
         <!-- 对象类型属性注入 -->
         <!-- ref属性与要引入bean的id保持一致即可-->
         <property name="dept" ref="dept"></property>
     </bean>
     ```

   - 内部 bean 方式：嵌套使用`bean`标签。

     ```xml
     <!--
     第二种方式：内部bean注入
     -->
     <bean id="emp2" class="com.mwt.spring6.iocxml.ditest.Emp">
         <!-- 普通类型属性注入 -->
         <property name="name" value="mary"></property>
         <property name="age" value="24"></property>
         <!-- 对象类型属性注入 -->
         <property name="dept">
             <bean id="dept2" class="com.mwt.spring6.iocxml.ditest.Dept">
                 <property name="name" value="财务部"></property>
             </bean>
         </property>
     </bean>
     ```

   - 级联赋值：
     ```xml
     <!--
     第三种方式：级联赋值
     -->
     <bean id="dept3" class="com.mwt.spring6.iocxml.ditest.Dept">
         <property name="name" value="技术部"></property>
     </bean>

     <bean id="emp3" class="com.mwt.spring6.iocxml.ditest.Emp">
         <!-- 普通类型属性注入 -->
         <property name="name" value="tom"></property>
         <property name="age" value="30"></property>
         <!-- 对象类型属性注入 -->
         <property name="dept" ref="dept3"></property>
         <!-- 可以通过这种方式修改注入对象的属性（要求dept属性必须有get方法） -->
         <property name="dept.name" value="测试部"></property>
     </bean>
     ```

   ```

   ```

2. 数组类型属性注入

   - 通过`array`标签实现
     ```xml
     <!-- 数组类型属性注入 -->
     <property name="loves">
         <array>
             <!-- 使用value标签的方式注入简单类型 -->
             <value>吃饭</value>
             <value>睡觉</value>
             <value>运动</value>
         </array>
     </property>
     ```

3. 集合类型属性注入

   - List 集合（有序可重复）类型属性注入：通过`list`标签实现

     ```xml
     <!-- List集合属性注入 -->
     <property name="empList">
         <list>
             <ref bean="emp"></ref>
             <ref bean="emp2"></ref>
             <ref bean="emp3"></ref>
         </list>
     </property>
     ```

   - Set 集合（无序不可重复）类型注入：通过`set`标签实现

     ```xml
     <property name="phones">
         <!-- Set集合属性注入 -->
         <set>
             <value>110</value>
             <value>110</value>
             <value>120</value>
             <value>120</value>
             <value>119</value>
             <value>119</value>
         </set>
     </property>
     ```

   - Map 集合类型属性注入：通过`map`标签实现

     ```xml
     <property name="addrs">
         <map>
             <!--如果key不是简单类型，使用 key-ref 属性-->
             <!--如果value不是简单类型，使用 value-ref 属性-->
             <entry key="1" value="北京大兴区"/>
             <entry key="2" value="上海浦东区"/>
             <entry key="3" value="深圳宝安区"/>
         </map>
     </property>
     ```

     ```xml
     <property name="teacherMap">
         <!-- map集合类型属性 -->
         <map>
             <entry>
                 <key>
                     <value>001</value>
                 </key>
                 <ref bean="teacher1"></ref>
             </entry>
             <entry>
                 <key>
                     <value>002</value>
                 </key>
                 <ref bean="teacher2"></ref>
             </entry>
         </map>
     </property>
     ```

   - `Properties`属性类对象注入：Properties 本质也是一个 Map 集合，但是它和 Map 集合的注入方式并不同，并且它的 key 和 value 必须是 String 类型。

   ```xml
   <property name="properties">
       <!-- 注入Properties属性类对象 -->
       <props>
           <prop key="driver">com.mysql.cj.jdbc.Driver</prop>
           <prop key="url">jdbc:mysql://localhost:3306/spring6</prop>
           <prop key="username">root</prop>
           <prop key="password">123456</prop>
       </props>
   </property>
   ```

   - 引用集合类型的 bean：通过`util:list`和`util:map`等标签实现，主要针对集合。可以通过这种`util命名空间`的方式实现**配置复用**。
     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <!-- 在这里引入了util:list、util:map标签所需的命名空间 -->
     <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:util="http://www.springframework.org/schema/util"
         xsi:schemaLocation="http://www.springframework.org/schema/util
         http://www.springframework.org/schema/util/spring-util.xsd
         http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans.xsd">
         <bean id="lesson1" class="com.mwt.spring6.iocxml.dimap.Lesson">
             <property name="name" value="Java开发"></property>
         </bean>

         <bean id="lesson2" class="com.mwt.spring6.iocxml.dimap.Lesson">
             <property name="name" value="前端开发"></property>
         </bean>

         <bean id="teacher1" class="com.mwt.spring6.iocxml.dimap.Teacher">
             <property name="id" value="001"></property>
             <property name="name" value="西门子"></property>
         </bean>

         <bean id="teacher2" class="com.mwt.spring6.iocxml.dimap.Teacher">
             <property name="id" value="002"></property>
             <property name="name" value="上官雪"></property>
         </bean>

         <!-- 使用这两个标签需要先引入命名空间 -->
         <util:list id="lessonList">
             <ref bean="lesson1"></ref>
             <ref bean="lesson2"></ref>
         </util:list>

         <util:map id="teacherMap">
             <entry>
                 <key>
                     <value>001</value>
                 </key>
                 <ref bean="teacher1"></ref>
             </entry>
             <entry>
                 <key>
                     <value>002</value>
                 </key>
                 <ref bean="teacher2"></ref>
             </entry>
         </util:map>

         <bean id="student" class="com.mwt.spring6.iocxml.dimap.Student">
             <property name="id" value="2001"></property>
             <property name="name" value="张三"></property>
             <!-- 注入List、Map集合属性 -->
             <property name="lessonList" ref="lessonList"></property>
             <property name="teacherMap" ref="teacherMap"></property>
         </bean>
     </beans>

     ```

4. `p`命名空间注入：主要起到一个**简化配置**的作用。

   - 引入 p 命名空间

   ```xml
   <beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:util="http://www.springframework.org/schema/util"
      xmlns:p="http://www.springframework.org/schema/p"
      xsi:schemaLocation="http://www.springframework.org/schema/util
      http://www.springframework.org/schema/util/spring-util.xsd
      http://www.springframework.org/schema/beans
      http://www.springframework.org/schema/beans/spring-beans.xsd">
   ```

   - 使用 p 命名空间注入（也是依赖于 set 方法）

   ```xml
   <bean id="studentp" class="com.mwt.spring6.iocxml.dimap.Student"
       p:id="2002" p:name="小明" p:lessonList-ref="lessonList" p:teacherMap-ref="teacherMap"></bean>
   ```

5. 外部属性文件注入：比如配置数据库组件。

   - 数据库依赖：

     ```xml
     <!-- MySQL驱动 -->
     <dependency>
         <groupId>mysql</groupId>
         <artifactId>mysql-connector-java</artifactId>
         <version>8.0.30</version>
     </dependency>

     <!-- 数据源 -->
     <dependency>
         <groupId>com.alibaba</groupId>
         <artifactId>druid</artifactId>
         <version>1.2.15</version>
     </dependency>
     ```

   - 外部属性文件：配置文件中建议加`jdbc`这个前缀，因为 spring `${变量名}`默认是先加载系统变量。

     ```properties
     jdbc.user=root
     jdbc.password=root
     jdbc.url=jdbc:mysql://localhost:3306/spring?serverTimezone=UTC
     jdbc.driver=com.mysql.cj.jdbc.Driver
     ```

   - 实现注入：先引入`context`命名空间，之后使用`context:property-placeholder`的`location`属性来指定属性配置文件的路径。
     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <!-- 需要先引入 context命名空间 -->
     <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:context="http://www.springframework.org/schema/context"
         xsi:schemaLocation="http://www.springframework.org/schema/context
         http://www.springframework.org/schema/context/spring-context.xsd
         http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans.xsd">

         <!-- 引入外部的属性文件 -->
         <context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>

         <!-- 使用表达式完成数据库信息的注入 -->
         <bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
             <property name="url" value="${jdbc.url}"></property>
             <property name="username" value="${jdbc.user}"></property>
             <property name="password" value="${jdbc.password}"></property>
             <property name="driverClassName" value="${jdbc.driver}"></property>
         </bean>

     </beans>
     ```

### 6. 基于 XML 的自动装配

**自动装配**：根据指定的策略，在 IOC 容器中匹配某一个 bean，自动为指定的 bean 中所依赖的类类型或接口类型属性赋值，自动装配可以根据**名字**进行，也可以根据**类型**装配。使用 bean 标签的 `autowire` 属性实现自动装配效果。自动装配是基于`set`方法的。

- 配置 bean
  ```xml
  <!-- autowire的值还可以设置为 byName，表示依据 名字 自动装配 -->
  <bean id="controller" class="com.mwt.spring6.iocxml.auto.controller.UserController" autowire="byType"></bean>
  <bean id="service" class="com.mwt.spring6.iocxml.auto.service.UserServiceImpl" autowire="byType"></bean>
  <bean id="dao" class="com.mwt.spring6.iocxml.auto.dao.UserDaoImpl"></bean>
  ```

> 自动装配方式：`byType` <br> 根据类型匹配 IOC 容器中的某个兼容类型的 bean，为属性自动赋值 <br> 若在 IOC 中，没有任何一个兼容类型的 bean 能够为属性赋值，则该属性不装配，即值为默认值 null <br> 若在 IOC 中，有多个兼容类型的 bean 能够为属性赋值，则抛出异常 NoUniqueBeanDefinitionException。

> 自动装配方式：`byName` <br> 将自动装配的属性的属性名，作为 bean 的 id 在 IOC 容器中匹配相对应的 bean 进行赋值（**bean 的 id 要与属性的 set 方法后半段名称保持一致**，否则会出错）

### 7. Bean 的作用域

#### 1. 最常用的两个作用域配置

在 Spring 中可以通过配置 bean 标签的 `scope` 属性来指定 bean 的作用域范围，取值含义参加下表：

| 取值                | 含义                                                                     | 创建对象的时机   |
| ------------------- | ------------------------------------------------------------------------ | ---------------- |
| `singleton`（默认） | 在 Spring 的 IOC 容器中，默认创建的 bean 始终为单实例对象                | IOC 容器初始化时 |
| `prototype`         | 表示这个 bean 在 IOC 容器中有多个实例（调用几次`getBean()`方法创建几次） | 获取 bean 时     |

#### 2. 其他的作用域配置

| 取值           | 含义                                                                                                                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| request        | 一个请求对应一个 Bean（**仅限在 Web 应用环境下使用**）                                                                                                                                                            |
| session        | 一个会话对应一个 Bean（**仅限在 Web 应用环境下使用**）                                                                                                                                                            |
| application    | 一个应用对应一个 Bean（**仅限在 Web 应用环境下使用**）                                                                                                                                                            |
| global session | **portlet 应用中专用的**。如果在 Servlet 的 WEB 应用中使用 global session 的话，和 session 一个效果。（portlet 和 servlet 都是规范。servlet 运行在 servlet 容器中，例如 Tomcat。portlet 运行在 portlet 容器中。） |
| websocket      | 一个 websocket 生命周期对应一个 Bean。（**仅限在 Web 应用环境下使用**）                                                                                                                                           |
| 自定义 scope   | 例如可以自定义一个线程对应一个 Bean。（**很少使用**）                                                                                                                                                             |

#### 3. 演示自定义 scope

- 第一步：自定义 scope（实现 Scope 接口）

  - spring 内置了线程范围的类：`org.springframework.context.support.SimpleThreadScope，可以直接使用。

- 第二步：将自定义的 scope 注册到 Spring 容器中。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 使用自定义的 scope -->
    <bean id="sb" class="com.mwt.spring6.bean.SpringBean" scope="threadScope"></bean>

    <bean class="org.springframework.beans.factory.config.CustomScopeConfigurer">
        <property name="scopes">
            <map>
                <entry key="threadScope">
                    <!-- 这个Scope接口的实现类使用的是Spring框架内置的。也可以自定义 -->
                    <bean class="org.springframework.context.support.SimpleThreadScope"></bean>
                </entry>
            </map>
        </property>

    </bean>
</beans>
```

- 测试程序

```java
@Test
    public void testThreadScope() {
        // 这个线程中的两个 bean 是同一个对象
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("xml/spring-scope.xml");
        SpringBean sb = applicationContext.getBean("sb", SpringBean.class);
        System.out.println(sb);
        SpringBean sb1 = applicationContext.getBean("sb", SpringBean.class);
        System.out.println(sb1);

        // 启动一个新的线程
        // 这个线程中的两个 bean 是同一个对象
        new Thread(new Runnable() {
            @Override
            public void run() {
                SpringBean sb2 = applicationContext.getBean("sb", SpringBean.class);
                System.out.println(sb2);
                SpringBean sb3 = applicationContext.getBean("sb", SpringBean.class);
                System.out.println(sb3);
            }
        }).start();
    }
```

### 8. Bean 的生命周期

- **具体生命周期**：
  1. `bean对象的创建（调用无参构造）`
  2. `给bean对象设置相关属性（注入）`
  3. 检查 bean 是否实现了 Aware 的相关接口，并调用接口方法。
  4. **bean 后置处理器（初始化之前）**：执行`before`方法
  5. 检查 bean 是否实现了 InitializingBean 接口，并调用接口方法
  6. `bean对象初始化（调用自己写的初始化方法）`：配置`init-method`属性。
  7. **bean 后置处理器（初始化之后）**：执行`after`方法
  8. `bean对象的使用`
  9. 检查是否实现了 DisposableBean 接口，并调用接口方法。
  10. `bean对象销毁（配置自己写的销毁方法）`：配置`destroy-method`属性，另外必须调用`ClassPathXmlApplicationContext`对象的`close`关闭容器，bean 对象才会销毁。

> bean 的`后置处理器`会在生命周期的初始化前后添加额外的操作，需要实现`BeanPostProcessor`接口，且**配置到 IOC 容器中**，需要注意的是，bean 后置处理器**不是单独针对某一个 bean 生效，而是针对当前配置文件的 IOC 容器中所有 bean 都会执行**

> Aware 相关接口：<br> `BeanNameAware`：Spring 会将 Bean 的名字传递给 Bean。<br> `BeanClassLoaderAware`：Spring 会将加载该 Bean 的类加载器传递给 Bean。<br> `BeanFactoryAware`：Spring 会将 Bean 工厂对象传递给 Bean。

> **Bean 的作用域不同，管理方式不同** <br> Spring 容器只对`singleton`的 bean 进行完整的生命周期管理，如果是`prototype`，Spring 容器只负责将该 Bean 初始化完毕，等客户端获取到该 bean 后，Spring 就不再管理该对象的生命周期了。

**自己 new 的对象，如何让 Spring 容器帮忙管理？**

通过`DefaultListableBeanFactory`对象注册实现：

```java
// 自己new的对象
Student student = new Student();
System.out.println(student);

// 将自己new的对象交给spring容器来管理
DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
factory.registerSingleton("studentBean", student);

// 从spring容器中获取bean
Student studentBean = factory.getBean("studentBean", Student.class);
System.out.println(studentBean);
```

### 9. 设计模式——工厂模式

#### 1. 设计模式

设计模式：**一种可以被重复利用的解决方案**。大部分的设计模式都是尽可能的满足软件开发原则的，属于软件架构设计内容。

- 《Design Patterns: Elements of Reusable Object-Oriented Software》（即《设计模式》一书），1995 年由 Erich Gamma、Richard Helm、Ralph Johnson 和 John Vlissides 合著。这几位作者常被称为"四人组（Gang of Four）"。 这本书里包含了 `23` 种设计模式。当然除了这 23 种设计模式之外，还有其他的设计模式，比如：MVC 模式等等。
- GoF 中的 23 种设计模式大致可以分为三大类：
  - **创建型**（5 个）：解决对象创建问题。
    - 单例模式
    - 工厂方法模式
    - 抽象工厂模式
    - 建造者模式
    - 原型模式
  - **结构型**（7 个）：一些类或对象组合在一起的经典结构。
    - 代理模式
    - 装饰模式
    - 适配器模式
    - 组合模式
    - 享元模式
    - 外观模式
    - 桥接模式
  - **行为型**（11 个）：解决类或对象之间的交互问题。
    - 策略模式
    - 模板方法模式
    - 责任链模式
    - 观察者模式
    - 迭代子模式
    - 命令模式
    - 备忘录模式
    - 状态模式
    - 访问者模式
    - 中介者模式
    - 解释器模式

#### 2. 工厂模式

工厂模式通常有三种形态：

- 第一种：简单工厂模式（Simple Factory）：不属于 23 种设计模式之一。**简单工厂模式又叫做：静态 工厂方法模式。简单工厂模式是工厂方法模式的一种特殊实现。**
- 第二种：工厂方法模式（Factory Method）：是 23 种设计模式之一。
- 第三种：抽象工厂模式（Abstract Factory）：是 23 种设计模式之一。

##### 1. 简单工厂模式

简单工厂模式的角色包括三个：

- **抽象产品角色**
- **具体产品角色**（继承抽象产品角色）
- **工厂类角色**

1. 简单工厂模式的**优点**：

   - 客户端程序不需要关心对象的创建细节，需要哪个对象时，只需要向工厂索要即可，初步实现了责任的分离。客户端只负责“消费”，工厂负责“生产”。生产和消费分离。

2. 简单工厂模式的缺点：
   - 缺点 1：工厂类集中了所有产品的创造逻辑，形成一个无所不知的全能类，有人把它叫做上帝类。显然工厂类非常关键，不能出问题，一旦出问题，整个系统瘫痪。
   - 缺点 2：不符合 OCP 开闭原则，在进行系统扩展时（加入新加一个产品），就需要修改工厂类。

Spring 中的 `BeanFactory` 就使用了简单工厂模式。

##### 2. 工厂方法模式

工厂方法模式既保留了简单工厂模式的优点，同时又解决了简单工厂模式的缺点。工厂方法模式的角色包括：

- **抽象工厂角色**
- **具体工厂角色**
- **抽象产品角色**
- **具体产品角色**

1. 工厂方法模式的优点：

   - 扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。解决了简单工厂模式的缺点。

2. 工厂方法模式的缺点：
   - 每次增加一个产品时，都需要增加一个具体类和对象实现工厂，使得系统中类的个数成倍增加，在一定程度上增加了系统的复杂度，同时也增加了系统具体类的依赖。这并不是什么好事。

##### 3. 抽象工厂模式

省略.....

### 10. Bean 的获取

Spring 为 Bean 提供了多种实例化方式，通常包括 4 种方式。（也就是说在 Spring 中为 Bean 对象的创建准备了多种方案，目的是：**增加灵活性**）

- 第一种：通过构造方法实例化（默认就是调用无参数构造方式进行的）：之前使用的方式都是这个
- 第二种：通过简单工厂模式实例化：首先创建工厂类，然后配置工厂类即可。
  ```xml
  <!-- 通过简单工厂模式实例化 bean：需要在Spring配置文件中告诉Spring框架，调用哪个类的哪个方法获取bean-->
  <!-- factory-method 这个属性指定的是工厂类当中的静态方法，也就是告诉Spring框架，调用这个方法可以获取 bean-->
  <bean id="starBean" class="com.mwt.spring6.bean.StarFactory" factory-method="get"></bean>
  ```
- 第三种：通过 factory-bean 实例化（工厂方法模式）：首先创建具体工厂类，然后配置具体工厂类即可。

  ```xml
  <!-- 通过工厂方法模式实例化：通过 factory-bean 属性 + factory-method 属性共同完成。-->
  <!-- 告诉Spring框架，调用哪个对象的哪个方法获取 bean-->
  <bean id="gunFactory" class="com.mwt.spring6.bean.GunFactory"></bean>
  <bean id="gunBean" factory-bean="gunFactory" factory-method="get"></bean>
  ```

- 第四种：通过 FactoryBean 接口实例化：

  `FactoryBean`是 Spring 提供的一种**整合第三方框架的常用机制**。和普通的 bean 不同，配置一个 FactoryBean 类型的 bean ，在获取 bean 的时候得到的并不是 class 属性中配置的这个类的对象，而是 `getObject()` 方法的返回值。

  通过这种机制，Spring 可以帮我们把复杂组件创建的详细过程和繁琐细节都**屏蔽**起来，只把最简洁的使用界面展示给我们。

  比如我们整合 Mybatis 时，Spring 就是通过 `FactoryBean` 机制来帮我们创建 SqlSessionFactory 对象的。

  - 第一步：创建一个实现`FactoryBean`接口的工厂类

  ```java
  package com.mwt.spring6.bean;

  import org.springframework.beans.factory.FactoryBean;

  public class PersonFactoryBean implements FactoryBean {
      @Override
      public Object getObject() throws Exception {
          return new Person();
      }

      @Override
      public Class<?> getObjectType() {
          return null;
      }

      /**
      * 这个方法在接口中有默认实现
      * 默认返回true 表示单例
      * 如果想要多例，返回 false 即可
      * @return
      */
      @Override
      public boolean isSingleton() {
          return FactoryBean.super.isSingleton();
      }
  }
  ```

  - 第二步：配置

  ```xml
  <!-- 通过实现FactoryBean接口实例化：这种方式实际上是第三种方式的简化 -->
  <bean id="personBean" class="com.mwt.spring6.bean.PersonFactoryBean"></bean>
  ```

**BeanFactory 和 FactoryBean 的区别？**

- **BeanFactory**：Spring IoC 容器的顶级对象，是`ApplicationContext`的爷爷接口。BeanFactory 被翻译为“Bean 工厂”，在 Spring 的 IoC 容器中，“Bean 工厂”负责创建 Bean 对象。简单来说 BeanFactory 是工厂。

- **FactoryBean**：它是一个 Bean，是一个能够**辅助 Spring 实例化其它 Bean 对象**的一个 Bean。在 Spring 中，Bean 可以分为两类：
  - 第一类：普通 Bean
  - 第二类：工厂 Bean（工厂 Bean 也是一种 Bean，只不过这种 Bean 比较特殊，它可以辅助 Spring 实例化其它 Bean 对象。）

**spring 中 bean 的依赖循环问题**

- 在`singleton` 加 `setter` 模式下，循环依赖是没有问题的，Spring 能够自动解决（先曝光，后赋值）。

- 在`prototype` 加 `setter` 模式下，会引发`BeanCurrentlyInCreationException`异常。

- 在`singleton` 加 构造注入 模式下，也会引发`BeanCurrentlyInCreationException`异常。主要原因还是没有将**实例化对象的过程**和**对象属性赋值的过程**没有分离开。

**spring 中通过三级缓存解决循环依赖的问题**

- 一级缓存`private final Map<String, Object> singletonObjects`：存储的是完整的单例 bean 对象，也就是说这个缓存中 bean 对象的属性值就已经赋值了，是一个完整的 Bean 对象。
- 二级缓存`private final Map<String, Object> earlySingletonObjects`：存储的是早期的单例 bean 对象，这个缓存中的单例 bean 对象还么有赋值，是一个早期的 bean 对象。
- 三级缓存`private final Map<String, ObjectFactory<?>> singletonFactories`：存储的是单例工厂对象，这个里面存储了大量的“工厂对象“。每一个单例 bean 对象都会对应一个单例工厂对象。这个集合存储的是，创建该单例对象时所对应的那个单例工厂对象。

### 11. 基于注解管理 Bean

从 Java 5 开始，Java 增加了对注解（Annotation）的支持，它是代码中的一种**特殊标记**，可以在`编译`、`类加载`和`运行`时被读取，执行相应的处理。开发人员可以通过注解在不改变原有代码和逻辑的情况下，在源代码中嵌入补充信息。

- 元注解`@Target`：用来修饰注解可以出现的位置。
- 元注解`@Retention`：用来修饰注解可以被读取的时机。

Spring 从 2.5 版本开始提供了对注解技术的全面支持，我们可以使用注解来实现**自动装配**，简化 Spring 的 XML 配置。并且 **Spring 倡导全注解开发**。

Spring 通过注解实现自动装配的步骤如下：

1. 引入 spring-aop 依赖（引入 spring-context 会自动引入）
2. **开启组件扫描**
3. 使用注解定义 Bean
4. 依赖注入

#### 1. 开启组件扫描

Spring 默认不使用注解装配 Bean，因此我们需要在 Spring 的 XML 配置中，通过 `<context:component-scan>` 元素开启 Spring Beans 的**自动扫描**功能。开启此功能后，Spring 会自动从扫描指定的包（**base-package 属性设置**）及其子包下的所有类，如果类、方法、属性上使用了 `@Component` 注解，就将该类、方法、属性装配到容器中。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 使用<context:component-scan>标签时，需要先引入context命名空间 -->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 开启组件扫描（默认扫描指定包下所有类） -->
    <!-- 多个包使用逗号隔开 -->
    <context:component-scan base-package="com.mwt"></context:component-scan>


    <!-- 方式二：排除某些规则 -->
    <context:component-scan base-package="com.mwt.spring6">
        <!-- context:exclude-filter标签：指定排除规则 -->
        <!--
             type：设置排除或包含的依据
            type="annotation"，根据注解排除，expression中设置要排除的注解的全类名
            type="assignable"，根据类型排除，expression中设置要排除的类型的全类名
        -->
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
        <!--<context:exclude-filter type="assignable" expression="com.mwt.spring6.controller.UserController"/>-->
    </context:component-scan>

    <!-- 方式三：指扫描某些组件 -->
    <context:component-scan base-package="com.mwt" use-default-filters="false">
        <!-- context:include-filter标签：指定在原有扫描规则的基础上追加的规则 -->
        <!-- use-default-filters属性：取值false表示关闭默认扫描规则 -->
        <!-- 此时必须设置use-default-filters="false"，因为默认规则即扫描指定包下所有类 -->
        <!--
             type：设置排除或包含的依据
            type="annotation"，根据注解排除，expression中设置要排除的注解的全类名
            type="assignable"，根据类型排除，expression中设置要排除的类型的全类名
        -->
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
        <!--<context:include-filter type="assignable" expression="com.mwt.spring6.controller.UserController"/>-->
    </context:component-scan>
</beans>
```

#### 2. 声明 Bean 的注解

Spring 提供了以下多个注解，这些注解可以直接标注在 Java 类上，将它们定义成 Spring Bean。

| 注解        | 说明                                                                                                                                                                                    |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @Component  | 该注解用于描述 Spring 中的 Bean，它是一个泛化的概念，仅仅表示容器中的一个组件（Bean），并且可以作用在应用的任何层次，例如 Service 层、Dao 层等。 使用时只需将该注解标注在相应类上即可。 |
| @Repository | 该注解用于将数据访问层（Dao 层）的类标识为 Spring 中的 Bean，是 @Component 注解的别名。                                                                                                 |
| @Service    | 该注解通常作用在业务层（Service 层），用于将业务层的类标识为 Spring 中的 Bean，是 @Component 注解的别名。                                                                               |
| @Controller | 该注解通常作用在控制层（如 SpringMVC 的 Controller），用于将控制层的类标识为 Spring 中的 Bean，是 @Component 注解的别名。                                                               |

#### 3. 依赖注入——`@Value`注入

当属性的类型是简单类型时，可以使用@Value 注解进行注入。

@Value 注解可以出现在**属性上**、**setter 方法上**、以及**构造方法的形参上**。

#### 4. 依赖注入——`@Autowired`注入以及`@Qualifier`注解

单独使用@Autowired 注解，**默认根据类型装配**，也就是`byType`。

- 该注解可以标注在哪里？

  - **构造方法上**
  - **setter 方法上**
  - **形参上**
  - **属性上**
  - **注解上**

- 该注解有一个 required 属性，默认值是 `true`，表示在注入的时候要求被注入的 Bean **必须是存在**的，如果不存在则报错。如果 required 属性设置为 false，表示注入的 Bean 存在或者不存在都没关系，存在的话就注入，不存在的话，也不报错。

- 另外：**当有参数构造方法只有一个时，@Autowired 注解可以省略**。而有多个构造方法时，必须添加注解。

- **@Autowired 注解和@Qualifier 注解联合使用**

  @Autowired 注解默认是根据`类型`注入。这就需要保证类型所对应的组件必须唯一。如果一个接口有多个实现类，这时候就需要根据`名称注入`，就需要配合`@Qualifier`注解一起使用。

```java
@Autowired
@Qualifier(value = "userRedisDaoImpl")
private UserDao userDao;
```

#### 5. 依赖注入——`@Resource`注入

- @Resource 注解是 JDK 扩展包中的，也就是说属于 JDK 的一部分。所以该注解是**标准注解**，更加具有通用性。(`JSR-250`标准中制定的注解类型。JSR 是 Java 规范提案。)
- @Autowired 注解是 Spring 框架自己的。
- **@Resource 注解默认根据名称装配 byName，未指定 name 时，使用属性名作为 name。通过 name 找不到的话会自动启动通过类型 byType 装配。**
- **@Autowired 注解默认根据类型装配 byType，如果想根据名称装配，需要配合 `@Qualifier` 注解一起用。**
- @Resource 注解用在**属性**、**setter 方法**上。
- @Autowired 注解用在**属性**、**setter 方法**、**构造方法**、**构造方法参数**上。

- @Resource 注解属于 JDK 扩展包，所以不在 JDK 当中，需要额外引入以下依赖：【**如果是 JDK8 的话不需要额外引入依赖。高于 JDK11 或低于 JDK8 需要引入以下依赖。**】
  ```xml
  <dependency>
      <groupId>jakarta.annotation</groupId>
      <artifactId>jakarta.annotation-api</artifactId>
      <version>2.1.1</version>
  </dependency>
  ```

#### 6. Spring 全注解开发

全注解开发就是不再使用 spring 配置文件了，写一个`配置类`来代替配置文件。

- 配置类
  ```java
  package com.mwt.spring6.config;

  import org.springframework.context.annotation.ComponentScan;
  import org.springframework.context.annotation.Configuration;

  @Configuration  // 配置类
  @ComponentScan("com.mwt.spring6")   // 开启组件扫描
  public class SpringConfig {

  }
  ```
- 通过加载配置类加载 IoC 容器
  ```java
  // 从配置类加载IoC容器
  ApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
  ```

### 12. 回顾 Java 反射机制

Java 反射机制主要实现**动态获取信息以及动态调用对象方法**的功能。更具体地说是指在运行状态时，对于任意一个类，我们都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意方法和属性。

要想解刨一个类，必须先要获取到该类的 `Class 对象`，而刨析一个类或使用反射解决具体问题就是使用相关 API 的过程。**Class 对象是反射的根源**。

- 获取`Class`对象

  - 通过`类名.Class`属性获取
  - 通过`对象名.getClass()`方法获取
  - 通过`Class.forName("全路径")`获取

- 实例化：通过`Class对象.getDeclaredConstructor().newInstance()`方法进行实例化

- 获取构造方法

  - 通过`Class对象名.getConstructors()`方法**仅能**得到所有`public`的构造方法。
  - 通过`Class对象名.getDecalaredConstructors()`方法**同时**可以得到所有`private`的构造方法。
  - 通过`Class对象名.getConstructor()`方法获取单个`public`的无参数构造方法。
  - 通过`Class对象名.getDecalaredConstructor(属性名.class，...)`方法获取单个`private`或`public`的有参构造方法。需要注意的是：**通过私有的有参数构造实例化对象之前需要先通过`构造方法对象.setAccessible(true)`允许访问。**

- 获取属性

  - 获取所有`public`属性：通过`Class对象名.getFields()`方法获取。
  - 获取所有属性（包含`private`属性）：通过`Class对象名.getDecalaredFields()`方法获取。同理，**若是想要通过`属性.set(对象, "属性值")`设置属性值，就需要先通过`属性.setAccesible(true)`允许访问**

- 获取方法
  - 通过`Class对象名.getMethods()`方法获取所有`public`方法
  - 通过`Class对象名.getDecalaredMethods()`方法获取所有方法（包含`private`方法）
  - 通过`获取到的方法.invoke(对象)`执行所获取到的方法。**执行私有方法之前需要先通过`setAccesible(true)`方法允许访问**。

### 13. 实现 Spring 中的 IoC 基于 set 的注入

- 见[代码仓库](https://github.com/whitevenus/JavaManuals/tree/main/codes/spring/spring6-powernode/myspring/src/main/java/org/myspringframework/core)中的具体代码

## 4 AOP

### 4.1 AOP 适用场景

- 我们可以想象一下这样一个场景：
  - 在实现某个接口时，我们需要在这个实现类的每个方法中加入日志功能，例如：
  ```java
  package com.mwt.spring6.aop.example;

  public class CalculatorLogImpl implements Calculator {

      @Override
      public int add(int i, int j) {

          System.out.println("[日志] add 方法开始了，参数是：" + i + "," + j);

          int result = i + j;

          System.out.println("方法内部 result = " + result);

          System.out.println("[日志] add 方法结束了，结果是：" + result);

          return result;
      }

      @Override
      public int sub(int i, int j) {

          System.out.println("[日志] sub 方法开始了，参数是：" + i + "," + j);

          int result = i - j;

          System.out.println("方法内部 result = " + result);

          System.out.println("[日志] sub 方法结束了，结果是：" + result);

          return result;
      }

      @Override
      public int mul(int i, int j) {

          System.out.println("[日志] mul 方法开始了，参数是：" + i + "," + j);

          int result = i * j;

          System.out.println("方法内部 result = " + result);

          System.out.println("[日志] mul 方法结束了，结果是：" + result);

          return result;
      }

      @Override
      public int div(int i, int j) {

          System.out.println("[日志] div 方法开始了，参数是：" + i + "," + j);

          int result = i / j;

          System.out.println("方法内部 result = " + result);

          System.out.println("[日志] div 方法结束了，结果是：" + result);

          return result;
      }
  }
  ```
- 不难发现上面做法的缺陷：

  - 附加功能代码对核心业务功能有**干扰**，导致程序员在开发核心业务功能时分散了精力
  - 附加功能分散在各个业务功能方法中，**不利于统一维护**

- 很明显我们需要对代码进行`解藕`操作才可以避免上面的缺陷。但是要抽取的代码在方法内部，**靠以前把子类中的重复代码抽取到父类的方式没法解决（继承）**。所以需要引入新的技术。

### 4.2 代理模式

#### 4.2.1 概念

**① 介绍**

二十三种设计模式中的一种，属于结构型模式。它的作用就是通过提供一个代理类，让我们在调用目标方法的时候，不再是直接对目标方法进行调用，而是通过代理类**间接**调用。让不属于目标方法核心逻辑的代码从目标方法中剥离出来——**解耦**。调用目标方法时先调用代理对象的方法，减少对目标方法的调用和打扰，同时让附加功能能够集中在一起也有利于统一维护。

![images](./images/spring6/img016.png)

使用代理后：

![images](./images/spring6/img017.png)

**② 生活中的代理**

- 广告商找大明星拍广告需要经过经纪人
- 合作伙伴找大老板谈合作要约见面时间需要经过秘书
- 房产中介是买卖双方的代理

**③ 相关术语**

- 代理：将非核心逻辑剥离出来以后，封装这些非核心逻辑的类、对象、方法。
- 目标：被代理“套用”了非核心逻辑代码的类、对象、方法。

#### 4.2.2 静态代理

静态代理确实实现了解耦，但是由于代码都写死了，完全不具备任何的灵活性。就拿日志功能来说，将来其他地方也需要附加日志，那还得再声明更多个静态代理类，那就产生了大量重复的代码，日志功能还是分散的，没有统一管理。

提出进一步的需求：将日志功能集中到一个代理类中，将来有任何日志需求，都通过这一个代理类来实现。这就需要使用动态代理技术了。

#### 4.2.3 动态代理

![动态代理](./images/spring6/img018.png)

- 创建动态代理工厂类

  ```java
  package com.mwt.spring6.aop.example;

  import java.lang.reflect.InvocationHandler;
  import java.lang.reflect.Method;
  import java.lang.reflect.Proxy;
  import java.util.Arrays;

  public class ProxyFactory {

      // 目标对象
      private Object target;

      public ProxyFactory(Object target) {
          this.target = target;
      }

      // 返回代理对象
      public Object getProxy() {
          /**
          * Proxy.newProxyInstance()方法有三个参数
          * 1. ClassLoader: 加载动态生成代理类的类加载器
          * 2. Class[] interfaces：目标对象实现的所有接口的Class类型的数组
          * 3. InvocationHandler：设置代理对象，实现目标对象方法的过程
          *
          */
          // 1. ClassLoader: 加载动态生成代理类的类加载器
          ClassLoader classLoader = target.getClass().getClassLoader();
          // 2. Class[] interfaces：目标对象实现的所有接口的Class类型的数组
          Class<?>[] interfaces = target.getClass().getInterfaces();
          // 3. InvocationHandler：设置代理对象，实现目标对象方法的过程
          InvocationHandler invocationHandler =  new InvocationHandler() {

              // 第一个参数：代理对象
              // 第二个参数：需要重写的目标对象方法
              // 第三个参数：method方法里面有参数
              @Override
              public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

                  // 方法调用之前做日志输出
                  System.out.println("[动态代理][日志] "+method.getName()+"，参数："+ Arrays.toString(args));

                  // 调用目标对象的方法
                  Object result = method.invoke(target, args);

                  // 方法调用之后做日志输出
                  System.out.println("[动态代理][日志] "+method.getName()+"，结果："+ result);

                  return result;
              }
          };

          return Proxy.newProxyInstance(classLoader, interfaces, invocationHandler);
      }
  }
  ```

- 测试类
  ```java
  package com.mwt.spring6.aop.example;

  public class TestCal {

      public static void main(String[] args) {

          // 创建代理对象（动态创建）
          ProxyFactory proxyFactory = new ProxyFactory(new CalculatorImpl());
          Calculator proxy = (Calculator) proxyFactory.getProxy();
          // 调用核心方法
          proxy.add(1, 2);
      }
  }
  ```

### 4.3 AOP 相关概念及相关术语

#### 4.3.1、概述

AOP（Aspect Oriented Programming）是一种设计思想，是软件设计领域中的面向切面编程，它是面向对象编程的一种补充和完善，它以**通过预编译方式和运行期动态代理方式实现，在不修改源代码的情况下，给程序动态统一添加额外功能的一种技术**。利用 AOP 可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

#### 4.3.2、相关术语

##### ① 横切关注点

分散在每个各个模块中解决同一样的问题，如用户验证、日志管理、事务处理、数据缓存都属于横切关注点。

从每个方法中抽取出来的**同一类非核心业务**。在同一个项目中，我们可以使用多个横切关注点对相关方法进行多个不同方面的增强。

这个概念不是语法层面的，而是根据附加功能的逻辑上的需要：有十个附加功能，就有十个横切关注点。

![images](./images/spring6/img019.png)

##### ② 通知（增强）

**增强，通俗说，就是你想要增强的功能，比如 安全，事务，日志等。**

每一个横切关注点上要做的事情都需要写一个方法来实现，这样的方法就叫通知方法。

- 前置通知：在被代理的目标方法**前**执行
- 返回通知：在被代理的目标方法**成功结束**后执行（**寿终正寝**）
- 异常通知：在被代理的目标方法**异常结束**后执行（**死于非命**）
- 后置通知：在被代理的目标方法**最终结束**后执行（**盖棺定论**）
- 环绕通知：使用`try...catch...finally`结构围绕**整个**被代理的目标方法，包括上面四种通知对应的所有位置

![images](./images/spring6/img020.png)

##### ③ 切面

封装通知方法的类。

![images](./images/spring6/img021.png)

##### ④ 目标

被代理的目标对象。

##### ⑤ 代理

向目标对象应用通知之后创建的代理对象。

##### ⑥ 连接点

这也是一个纯逻辑概念，不是语法定义的。

把方法排成一排，每一个横切位置看成 x 轴方向，把方法从上到下执行的顺序看成 y 轴，x 轴和 y 轴的交叉点就是连接点。**通俗说，就是 spring 允许你使用通知的地方**

![images](./images/spring6/img022.png)

##### ⑦ 切入点

定位连接点的方式。

每个类的方法中都包含多个连接点，所以连接点是类中客观存在的事物（从逻辑上来说）。

如果把连接点看作数据库中的记录，那么切入点就是查询记录的 SQL 语句。

**Spring 的 AOP 技术可以通过切入点定位到特定的连接点。通俗说，要实际去增强的方法**

切点通过 `org.springframework.aop.Pointcut` 接口进行描述，它使用类和方法作为连接点的查询条件。

#### 4.3.3、作用

- 简化代码：把方法中固定位置的重复的代码**抽取**出来，让被抽取的方法更专注于自己的核心功能，提高内聚性。

- 代码增强：把特定的功能封装到切面类中，看哪里有需要，就往上套，被**套用**了切面逻辑的方法就被切面给增强了。
