---
layout: post
title: spring-boot-starter-parent配置问题
categories: [general]
tags: [IT,JAVA,springboot]
fullview: true
comments: true
---

在使用springboot的maven构建工程的时候，有两种方法，官方文档中  
<a href="http://docs.spring.io/spring-boot/docs/1.4.1.RELEASE/reference/htmlsingle/#using-boot-maven-parent-pom">官网Maven配置</a>  
第一种为    
  
  
```
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.4.1.RELEASE</version>
</parent>

<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>

```  
   
这种方法会自动配置相关属性spring-boot-maven-plugin不需要配置具体属性就可以编译出可执行的jar/war，但是需要parent标签，详情见官网Maven配置，
第二种为  
  
     
```
<dependencyManagement>
     <dependencies>
        <dependency>
            <!-- Import dependency management from Spring Boot -->
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>1.4.1.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```   
  
   
第二种方法，配置后再IDE(eclipse)中可以执行，但是编译成jar文件后java -jar会报错没有mainclass，需要对spring-boot-maven-plugin进行具体配置  
  
    
```
   <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <maimClass>${start-class}</maimClass>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.1</version>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
```  
  
=[spring-boot-maven-plugin 官方API][1]


  [1]: http://docs.spring.io/spring-boot/docs/current/maven-plugin/usage.html
