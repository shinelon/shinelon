---
layout: post
title: springboot issue!
categories: [general,study]
tags: [IT,JAVA,springboot]
fullview: true
comments: true
---
The space in the configuration file will result in different running results(eclipse and jar).

I find a case:
version.1.4.1.RELEASE.version

in the application.properties
``` 
logging.config=classpath:log4j2.xml 
```
There is a space behind the 'log4j2.xml',the configuration can work in the eclipse ,but run the configuration as a jar (**java -jar**) it do not work!
```
Logging system failed to initialize using configuration from 'classpath:log4j2.xml '
```
```
java.io.FileNotFoundException: 
class path resource [log4j2.xml ] cannot be resolved to 
```
```
URL because it does not exist at org.springframework.util.ResourceUtils.getURL(ResourceUtils.java:138)
```
  
  

delete the space behind the 'log4j2.xml',it works as a jar.

is ok?

