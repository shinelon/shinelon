---
layout: post
title: Guava Striped总结
categories: [general]
tags: [concurrent]
fullview: true
comments: true
---

### Guava Striped总结

#### 业务背景

最近在研究接口平台API的token的获取方法，类似微信token，有过期时间需要持久化并更新。

```java
    Lock l = new ReentrantLock();
    l.lock();
    try {
    	if (isAccessTokenExpired()) {
           //update token
    	}
           // get token
    	} finally {
    	l.unlock();
    }
```

若全局只有一个token这样获取token，没有问题，但是若全局有tokenA，tokenB等等，则获取tokenA的时候tokenA的时候tokenB需要等待。这个时候我们要细化锁的粒度。

#### Striped注释分析

google 出品必属精品。

首先阅读源码注释得到以下说明：

- 细化锁的粒度并允许独立操作。
- key-value数据结构，通过key获取对应的锁
  - 若key1.equals(key2)则striped.get(key1) == striped.get(key2)
  - 若!key1.equals(key2)则不保证striped.get(key1) != striped.get(key2)，即key1和key2为同一把锁，暂且叫做锁冲突
  - stripes数量越少锁冲突概率越大
- striped分为strong和weak
  - strong为提前初始化、强引用、不可回收
  - weak为延迟初始化、弱引用、可回收

#### Striped数据结构

striped的基础数据结构为key-value，以Striped<Lock>为例。value为 `ReentrantLock(false)` ，key的数据结构分为strong和weak

- strong的key的数据结构为`Object[]`
- weak的key的数据结构根据striped的数量分为`ConcurrentMap<Integer, Lock>`和`AtomicReferenceArray<ArrayReference<? extends Lock>>` 且都为弱引用

#### 锁冲突问题

```java
  private abstract static class PowerOfTwoStriped<L> extends Striped<L> {
    /** Capacity (power of two) minus one, for fast mod evaluation */
    final int mask;

    PowerOfTwoStriped(int stripes) {
      Preconditions.checkArgument(stripes > 0, "Stripes must be positive");
      this.mask = stripes > Ints.MAX_POWER_OF_TWO ? ALL_SET : ceilToPowerOfTwo(stripes) - 1;
    }

    @Override
    final int indexFor(Object key) {
      int hash = smear(key.hashCode());
      return hash & mask;
    }

    @Override
    public final L get(Object key) {
      return getAt(indexFor(key));
    }
  }
```

其中`mask`为大于参数`stripes`的最小2的N次方减一，即散列的地址为0到mask。当发生散列碰撞的时候，即发生锁冲突。 
