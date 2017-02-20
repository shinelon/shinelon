---
layout: post
title: JDBC小结-execute
categories: [general]
tags: [JDBC]
fullview: true
comments: true
---



工作操作JDBC中发现一个错误，总结下。

- 使用`executeQuery()` 执行`update` `delete` `insert` 的时候会报如下异常。

```java
java.sql.SQLException: Can not issue data manipulation statements with executeQuery().
```

- 使用`executeUpdate()` 执行`select` 的时候会报如下异常。

```java
java.sql.SQLException: Can not issue executeUpdate() for SELECTs
```

- 使用`execute` 执行`select` `update` `delete` `insert` 都可以正常执行。

使用JDBC操作的时候会使用`Statement` 和`PreparedStatement` ，我去看下源码是如何说明的。JDBC是连接多种数据库的统一标准，JDBC规定的标准由不同的数据库驱动负责具体实现。所以`Statement` 和`PreparedStatement` 都是借口，我们也只需要看下接口的注释就可以了。

`PreparedStatement` 继承于`Statement` 

我先看看`Statement` 如何定义相关方法的 ：

- `executeQuery` 方法中异常说明：

```java
     * @exception SQLException if a database access error occurs,
     * this method is called on a closed <code>Statement</code>, the given
     *            SQL statement produces anything other than a single
     *            <code>ResultSet</code> object, the method is called on a
     * <code>PreparedStatement</code> or <code>CallableStatement</code>
```

当使用`executeQuery` 方法只要产生一个不是`ResultSet` 的对象就会报`SQLException` 异常，即篇头错误。

- `executeUpdate`方法中异常说明
```java 
     * @exception SQLException if a database access error occurs,
     * this method is called on a closed <code>Statement</code>, the given
     * SQL statement produces a <code>ResultSet</code> object, the method is called on a
     * <code>PreparedStatement</code> or <code>CallableStatement</code>
```

当使用`executeUpdate` 方法产生一个`ResultSet` 对象就会报`SQLException` 异常，即篇头错误。

是否产生`ResultSet` 对象是区分`executeQuery` 和`executeUpdate` 的关键。

为什么`execute`方法可以正常执行呢？

```java
    /**
     * Executes the given SQL statement, which may return multiple results.
     * In some (uncommon) situations, a single SQL statement may return
     * multiple result sets and/or update counts.  Normally you can ignore
     * this unless you are (1) executing a stored procedure that you know may
     * return multiple results or (2) you are dynamically executing an
     * unknown SQL string.
```

`execute` 方法可以返回`result sets and/or update counts` 。所以`execute` 可以正常执行。

`PreparedStatement` 中关于各个方法的说明都与`Statement` 类似，小伙伴可以自行去看源码。

##### 多读源码，好处多多 。