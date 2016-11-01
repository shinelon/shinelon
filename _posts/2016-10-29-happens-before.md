---
layout: post
title: happens-before!
categories: [general,study]
tags: [IT,JAVA]
fullview: true
comments: true
---

>《JSR-133：Java Memory Model and Thread Specification》定义happens-before规则<br>

 1. 程序顺序规则：一个线程中的每个操作，happens-before与该线程中的任意后续操作。
 2. 监视器锁规则：对一个锁的解锁，happens-before于随后对这个锁的加锁。
 3. volatile变量规则：对一个volatile域的写，happens-before于任意后续对这个volatile域的读。
4. 传递性规则：如果Ahappens-beforeB，且Bhappens-beforeC,那么Ahappens-beforeC。
5. start()规则：如果线程A执行操作ThreadB.start()(启动线程B)，那么线程A的ThreadB.start()操作happens-before于线程B中的任意操作。
6. join()规则：如果线程A执行操作ThreadB.join()并层高返回，那么线程B中的任意操作happens-before于线程A从ThreadB.join()操作成功返回。
