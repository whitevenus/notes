# 一、简介

## 1. SpringBoot介绍

Spring Boot 是一款助力开发者迅速构建独立运行的、可用于生产环境的 Spring 应用的工具。它提供了一种对 Spring 框架及其第三方库进行整合的视角，旨在简化配置过程，让开发者能够快速上手。Spring Boot 通过其内置的约定和自动配置机制，极大地减少了手动配置的需求，从而让开发者能够专注于应用程序的开发，而不是繁琐的配置工作。

## 2. Spring Boot 的核心特性

Spring Boot 的核心特性包括：

1. 独立应用构建：Spring Boot 助你快速生成自包含的 Spring 应用，无需外部服务器或容器即可独立运行。
2. 内嵌 Web 服务器：你的应用可以内嵌 Tomcat、Jetty 或 Undertow，省去了打包为 WAR 文件并部署到外部服务器的步骤。这意味着你可以使用`java -jar`命令运行一个可执行的JAR文件，而不需要外部的Web服务器。这简化了应用程序的部署和运行。
3. “Starter” 依赖管理：Spring Boot 提供了预定义的依赖集合，简化了 Maven 或 Gradle 的构建配置，加速开发进程。
4. 自动配置：Spring Boot 自动设置 Spring 和其他常用库的配置，减少了手动干预，让你可以集中精力编写核心业务代码。
5. 生产就绪特性：它包括了诸如指标监控、健康检查和外部配置等生产环境所需的特性，使得应用的部署和管理更加便捷。
6. 无代码生成和 XML 配置：Spring Boot 推崇基于注解的配置方式，消除了代码生成和 XML 配置的需求，提升了开发效率和简洁性。

概括来说，Spring Boot 旨在简化开发流程、减少配置需求、便于系统集成、快捷部署应用、易于监控和运维管理。

# 二、快速上手指南

> 场景：当浏览器发起 “/hello” 请求时，服务器应答 “Hello, Spring Boot 3!”

## 1. 开发流程

### 1.创建项目（配置pom.xml文件）

所有springboot项目都**必须**继承自` spring-boot-starter-parent`

```xml
<!--  所有springboot项目都必须继承自 spring-boot-starter-parent -->
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>3.0.5</version>
</parent>
```

### 2. 导入Web开发相关场景

在`pom.xml`文件中配置与web开发相关的场景启动器：

```xml
<dependencies>
<!-- web开发的场景启动器 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>

```

### 3. 书写Spring主入口程序

```java
@SpringBootApplication //这是一个SpringBoot应用
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class,args);
    }
}
```

### 4. 书写业务程序

```java
@RestController
public class HelloController {
		
    // 使用 @GetMapping 注解来处理 GET 类型的请求
    @GetMapping("/hello")
    public String hello(){
				
      	// 返回字符串 "Hello, Spring Boot 3!" 作为响应
        return "Hello,Spring Boot 3!";
    }

}
```

### 5. 测试应用程序

启动应用后，默认可以通过访问 http://localhost:8080 来进行测试

### 6. 打包部署

配置SpringBoot的应用打包插件：

```xml
<!--    SpringBoot应用打包插件-->
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

使用 Maven 命令 `mvn clean package` 对项目进行清理并打包，生成一个可执行的 JAR 文件。随后，可以使用命令 `java -jar xxxxxx.jar` 来启动该打包后的应用程序。

## 2. 特性总结

### 1. 简化集成

通过引入特定的"场景启动器"，Spring Boot 可以轻松地整合各种功能。这些启动器提供了所需依赖的集合，确保了一站式的功能支持。

- 官方提供的启动器以 “spring-boot-starter-” 开头。
- 第三方提供的启动器以 “-spring-boot-starter” 结尾。 
- 默认支持的启动器列表可以在[官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters)中找到

一旦引入了所需的启动器，相关的功能就可以立即使用。

### 2. 简化开发

 Spring Boot 允许开发者直接开始业务逻辑的开发，无需编写繁琐的配置代码。

### 3. 简化配置 

通过 `application.properties` 文件，配置变得更加集中和简单：

- 所有配置项集中在一个地方，易于管理。
- 大多数配置都有合理的默认值，减少了必须手动设置的项。
- 核心配置的完整列表在[官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#appendix.application-properties)中提供

### 4. 简化部署 

应用可以打包成一个可执行的 JAR 文件，使得在拥有 Java 环境的 Linux 服务器上部署变得简便。

### 5. 简化运维 

应用运维变得更加简单，包括：

- 可以通过外部的 `application.properties` 文件来覆盖默认配置。
- 提供了监控和健康检查等生产就绪特性，以便于应用的维护和管理。

# 三、应用剖析

## 1. 依赖管理机制

> 思考：为什么导入Web启动器（starter-web）后，所有相关的依赖都会被自动导入？

- 在开发特定场景时，只需导入对应场景的启动器。
- 遵循Maven的依赖传递规则。例如，如果项目A依赖B，B依赖C，那么A将自动拥有B和C的依赖。
- 导入特定场景的启动器后，该启动器会自动导入实现该场景所需的所有核心依赖。

> 思考：导入场景启动器时为什么不需要手动指定版本号？

- 每个Spring Boot项目都有一个父项目，即`spring-boot-starter-parent`。
- `spring-boot-starter-parent`的父项目是`spring-boot-dependencies`。
- `spring-boot-dependencies`作为一个**版本仲裁中心**，已经预先声明了所有常见jar包的依赖版本。例如，`mysql-connector-java`的版本已经在父项目中进行了管理。

> 思考：如何自定义版本号？

+ 借助Maven的“最近优先”原则：
  + 可以在项目的`properties`标签中重新声明父项目中使用的版本属性键，以覆盖默认版本。
  + 此外，也可以在导入依赖时直接指定版本号。

> 思考：如何处理第三方jar包？

+ 对于那些没有被Spring Boot父项目管理的第三方jar包，您需要自行在项目中声明并管理其版本号。

## 2. 自动配置机制

### 1. 初步理解 

+ **自动配置的组件：**

  - 当导入某个场景的启动器时，Spring Boot会自动配置该场景所需的核心组件。

  - 以往需要手动配置的组件，如DispatcherServlet、ViewResolver、CharacterEncodingFilter等，现在都通过自动配置完成。

通过查看容器中存在的组件，我们可以确认应用具备的功能：

```java
public static void main(String[] args) {

    //java10： 局部变量类型的自动推断
    var ioc = SpringApplication.run(MainApplication.class, args);

    //1、获取容器中所有组件的名字
    String[] names = ioc.getBeanDefinitionNames();
    //2、挨个遍历：
    // dispatcherServlet、beanNameViewResolver、characterEncodingFilter、multipartResolver
    // SpringBoot把以前配置的核心组件现在都给我们自动配置好了。
    for (String name : names) {
        System.out.println(name);
    }

}
```

+ **默认的包扫描规则**：
  + 使用`@SpringBootApplication`注解的类作为主程序类。Spring Boot只会自动扫描主程序类所在的包及其子包，实现自动的组件扫描功能。
  + 也可以自定义扫描路径：
    + 使用`@SpringBootApplication`注解的`scanBasePackages`属性指定扫描的基础包，例如`@SpringBootApplication(scanBasePackages = “com.example”)`。
    + 或者使用`@ComponentScan`注解直接指定扫描的路径，例如`@ComponentScan(“com.example”)`。
+ **配置默认值**：
  + 配置文件中的所有配置项都会与某个类的属性进行绑定。这些类被称为属性类，它们负责绑定配置文件中的值。例如： 
    - `ServerProperties`类绑定了所有与Tomcat服务器相关的配置。
    - `MultipartProperties`类绑定了所有与文件上传相关的配置。
    - 更多绑定的属性类可以参考官方文档。

+ **按需加载自动配置：**
  + 当导入特定场景的启动器，如`spring-boot-starter-web`时：除了引入相关功能依赖，还会引入一个基础的核心启动器`spring-boot-starter`。
  + `spring-boot-starter`会导入一个名为`spring-boot-autoconfigure`的包，其中包含了各种场景的自动配置类。
  + 尽管所有场景的自动配置都存在于`spring-boot-autoconfigure`包中，但并非所有配置都会被激活。只有当导入了特定场景的启动器，相应的自动配置才会生效。

> 总结： 当引入特定场景的启动器时，会激活`spring-boot-autoconfigure`包中的自动配置，从而使Spring Boot容器具备相应场景所需的功能。

### 2. 完整流程

> 思考：
>
> + SpringBoot怎么实现导一个**`**starter**`**、写一些简单配置，应用就能跑起来，我们无需关心整合
> + 为什么Tomcat的端口号可以配置在`application.properties`中，并且`Tomcat`能启动成功？
> + 导入场景后哪些**自动配置能生效**？

**自动配置流程的详细梳理：**

1. **导入`starter-web`**：

   + 引入了web开发所需的所有依赖，如`starter-json`、`starter-tomcat`、`springmvc`。
   + 每个场景启动器都依赖于`spring-boot-starter`，这是核心启动器。
   + 核心启动器又引入了`spring-boot-autoconfigure`包。`spring-boot-autoconfigure`包含了所有场景的配置。只有当这个包下的所有类都生效时，SpringBoot官方提供的整合功能才会生效。
   + 然而，SpringBoot默认不会扫描`spring-boot-autoconfigure`下的配置类，它只扫描主程序所在的包。

2. **主程序：`@SpringBootApplication`**：

   - `@SpringBootApplication`由三个注解组成：`@SpringBootConfiguration`、`@EnableAutoConfiguration`、`@ComponentScan`。

   - SpringBoot默认只扫描主程序所在包及其子包，不会扫描到`spring-boot-autoconfigure`中的官方配置类。

   - `@EnableAutoConfiguration`是开启自动配置的核心。
     - 它通过`@Import(AutoConfigurationImportSelector.class)`实现批量导入组件。
     - SpringBoot启动时默认加载142个配置类。
     - 这些配置类来源于`spring-boot-autoconfigure`下的`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`文件。
     - 项目启动时，使用`@Import`机制批量导入`autoconfigure`包下的142个`xxxxAutoConfiguration`类（自动配置类）。
     - 尽管导入了142个自动配置类，但并非所有都会生效。

3. **`xxxxAutoConfiguration`自动配置类**：

   - 使用`@Bean`向容器中添加多个组件。
   - 每个自动配置类可能都有`@EnableConfigurationProperties(ServerProperties.class)`注解，用于将配置文件中指定前缀的属性值封装到`xxxProperties`类中。
   - 以Tomcat为例，所有以`server`开头的配置都被封装到了属性类中。
   - 容器中所有组件的核心参数都来自`xxxProperties`，这些属性类都与配置文件绑定。
   - 只需修改配置文件的值，即可修改核心组件的底层参数。

4. **编写业务代码**：

   - 在整个过程中，无需关心各种整合问题，因为底层整合已经编写并生效。

**自动配置核心流程总结：**

1. **Starter依赖与自动配置包**：
   - 引入Starter后，相应的`autoconfigure`包会被自动导入。
2. **自动配置类的加载**：
   - 在`autoconfigure`包中，`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`文件列出了所有启动时需要加载的自动配置类。
3. **启用自动配置**：
   - 使用`@EnableAutoConfiguration`注解后，它会读取上述文件并导入所有列出的自动配置类。这些`xxxAutoConfiguration`类通过条件注解实现按需加载。
4. **组件的导入与配置**：
   - `xxxAutoConfiguration`类负责向容器中添加各种组件，这些组件的属性值从对应的`xxxProperties`类中获取。
5. **属性绑定**：
   - `xxxProperties`类与配置文件中的属性绑定，使得配置文件的修改能够直接影响底层组件的行为。

综上所述，通过导入Starter并调整配置文件，可以轻松地定制和修改应用程序的底层行为。

# 四、核心技能

## 1. 常用注解

> Spring Boot采用全注解方式替代了传统的XML配置。

### 1. 组件注册注解

+ `@Configuration`：这是一个类级别的注解，用来标记一个配置类（替代以前的配置文件），该类可以包含多个`@Bean`注解的方法，用于向Spring容器注册组件。
+ `@SpringBootConfiguration`：这是`@Configuration`的一个特殊变体，它用于标记Spring Boot应用程序的主配置类。通常，这个注解与`@EnableAutoConfiguration`和`@ComponentScan`一起使用。
+ `@Bean`：这个注解用于标记一个方法，该方法会返回一个对象，该对象应该被注册为Spring应用程序上下文中的bean。被注册的组件在IOC容器中的名字默认是方法名，也可以直接修改注解的值用于指定组件的名字。
+ `@Scope`：这个注解用于定义一个bean的作用域。例如，可以将其设置为`prototype`（每次请求时创建新的实例）或`singleton`（整个应用程序中只有一个实例）。默认为`singleton`（单实例模式）
+ `@Controller`：这个注解用于标记一个类作为Spring MVC控制器组件。
+ `@Service`：这个注解用于标记一个类作为业务逻辑组件。
+ `@Repository`：这个注解用于标记一个类作为数据访问组件，通常用于DAO层。
+ `@Component`：这是一个通用的组件注解，用于标记一个类作为Spring容器的组件。当没有特定的层注解可用时，可以使用`@Component`。
+ `@Import`：这个注解用于导入一个或多个配置类（配置类也是组件），以便将它们包含在Spring应用程序上下文中。组件的名字默认是全类名。
+ `@ComponentScan`：这个注解用于指定Spring在初始化时要扫描的包路径，以便发现并注册标记有`@Component`、`@Service`、`@Repository`或`@Controller`注解的类。

### 2. 条件注解

> 条件注解根据指定的条件是否成立来触发相应的行为。

`@ConditionalOnXxx`：这是一系列注解，它们根据特定的条件来决定是否要创建一个bean或执行某些配置。以下是比较常见的一些示例：

- `@ConditionalOnClass`：当类路径中存在指定的类时，触发指定行为。
- `@ConditionalOnMissingClass`：当类路径中不存在指定的类时，触发指定行为。
- `@ConditionalOnBean`：当Spring容器中存在指定的bean时，触发指定行为。
- `@ConditionalOnMissingBean`：当Spring容器中不存在指定的bean时，触发指定行为。

### 3. 属性绑定注解

+ `@ConfigurationProperties`： 用于指示Spring Boot将带有该注解的类的属性与配置文件中的属性进行绑定。通过指定一个前缀，可以将配置文件中与前缀匹配的属性映射到类的字段上。

+ `@EnableConfigurationProperties` ：当我们的配置类不在Spring Boot主程序所在的包或者子包中时，使用这个注解可以启用对 `@ConfigurationProperties` 注解的支持，并触发对带有 `@ConfigurationProperties` 注解的类的处理和注册。主要用于导入第三方写好的组件进行属性绑定。

这里是一个简化的使用步骤：

1. **创建配置属性类**：首先，你需要创建一个带有字段的类，这些字段对应于配置文件中的属性。
2. **使用 `@ConfigurationProperties` 注解**：在你的配置属性类上添加 `@ConfigurationProperties` 注解，并提供一个前缀，这个前缀对应于配置文件中的属性前缀。
3. **注册配置属性类**：如果这个配置属性类不在主程序所在的包中，使用 `@EnableConfigurationProperties` 注解来指示Spring Boot注册这个类。

这样，当应用程序启动时，Spring Boot会自动将配置文件中的属性值绑定到你的配置属性类的字段上，使得配置信息能够在应用程序中全局访问和使用。
