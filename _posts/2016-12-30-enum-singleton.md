---
layout: post
title: Enum Singleton!
categories: [general]
tags: [pattern]
fullview: true
comments: true
---

**Enum单例模式深入学习**  

直接上代码  

```java
public enum Test {	
	ONE;	
	public void doMethod(){
		System.out.println("123");
	}	
}
```

  

反编译后  

```java
public final class Test extends Enum
{

	public static final Test ONE;
	private static final Test ENUM$VALUES[];

	private Test(String s, int i)
	{
		super(s, i);
	}

	public void doMethod()
	{
		System.out.println("123");
	}

	public static Test[] values()
	{
		Test atest[];
		int i;
		Test atest1[];
		System.arraycopy(atest = ENUM$VALUES, 0, atest1 = new Test[i = atest.length], 0, i);
		return atest1;
	}

	public static Test valueOf(String s)
	{
		return (Test)Enum.valueOf(demo/Test, s);
	}

	static 
	{
		ONE = new Test("ONE", 0);
		ENUM$VALUES = (new Test[] {
			ONE
		});
	}
}
```



反编译后，发现Enum可以看做是一种单例模式的精简写法。  

在查询ORACLE官网获取证明，地址<a href="http://docs.oracle.com/javase/specs/jls/se8/html/jls-8.html#jls-8.9">Enum Types</a>  



> - The `final` `clone` method in `Enum` ensures that enum constants can never be cloned.
> - Reflective instantiation of enum types is prohibited.
> - Special treatment by the serialization mechanism ensures that duplicate instances are never created as a result of deserialization.

  

简单说就是  

- Enum不会被cloned
- Enum不会被反射创建
- Enum还支持序列化，且是同一个实例

​    

继续看官网文档  

> In an enum declaration, a constructor declaration with no access modifiers is `private`.  

  

Enum的构造函数一定是`private`   

通过反编译Enum示例文件和查看Enum官方文档。总结如下：  

- Enum单例模式，是一种精简的单例写法。
- 通过`static`块初始化，保证线程安全。
- Enum单例模式，不会被cloned，不会被反射创建，支持序列化。

