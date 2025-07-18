## List

### ArrayList 和 LinkedList 有什么区别？

（1）数据结构不同

* ArrayList基于数组实现

* LinkedList基于双向链表实现

(2）多数情况下，ArrayList更利于查找，LinkedList更利于增删

* ArrayList基于数组实现，get(int index)可以直接通过数组下标获取，时间复杂度是O(1)；LinkedList基于链表实现，get(int index)需要遍历链表，时间复杂度是O(n)；当然，get(E element)这种查找，两种集合都需要遍历，时间复杂度都是O(n)。

* ArrayList增删如果是数组末尾的位置，直接插入或者删除就可以了，但是如果插入中间的位置，就需要把插入位置后的元素都向前或者向后移动，甚至还有可能触发扩容；双向链表的插入和删除只需要改变前驱节点、后继节点和插入节点的指向就行了，不需要移动元素。

* 但如果插⼊的是中间的位置，就需要把插⼊位置后的元素向前或者向后移动，甚⾄还有可能触发扩容，效率就会低 很多，变成 O(n)。

* LinkedList 因为是链表结构，插⼊和删除只需要改变前置节点、后置节点和插⼊节点的引⽤，因此不需要移动元 素。 如果是在链表的头部插⼊或者删除，时间复杂度是 O(1)；如果是在链表的中间插⼊或者删除，时间复杂度是 O(n)，因为需要遍历链表找到插⼊位置；如果是在链表的尾部插⼊或者删除，时间复杂度是 O(1)。

（3）是否支持随机访问

* ArrayList基于数组，所以它可以根据下标查找，支持随机访问，当然，它也实现了RandmoAccess 接口，这个接口只是用来标识是否支持随机访问。

* LinkedList基于链表，所以它没法根据序号直接获取元素，它没有实现RandmoAccess 接口，标记不支持随机访问。

(4) 内存占用，ArrayList基于数组，是一块连续的内存空间，LinkedList基于链表，内存空间不连续，它们在空间占用上都有一些额外的消耗：

* ArrayList是预先定义好的数组，可能会有空的内存空间，存在一定空间浪费

* LinkedList每个节点，需要存储前驱和后继，所以每个节点会占用更多的空间

### ArrayList扩容机制

ArrayList是基于数组的集合，数组的容量是在定义的时候确定的，如果数组满了，再插入，就会数组溢出。所以在插入时候，会先检查是否需要扩容，如果当前容量+1超过数组长度，就会进行扩容。

ArrayList的扩容是创建一个1.5倍的新数组，然后把原数组的值拷贝过去

### 快速失败fail-fast

快速失败（fail—fast）：快速失败是Java集合的一种错误检测机制

* 在用迭代器遍历一个集合对象时，如果线程A遍历过程中，线程B对集合对象的内容进行了修改（增加、删除、修改），则会抛出Concurrent Modification Exception。

* 原理：迭代器在遍历时直接访问集合中的内容，并且在遍历过程中使用一个 `modCount`  变量。集合在被遍历期间如果内容发生变化，就会改变`modCount`的值。每当迭代器使用hashNext()/next()遍历下一个元素之前，都会检测modCount变量是否为expectedmodCount值，是的话就返回遍历；否则抛出异常，终止遍历。

* 注意：这里异常的抛出条件是检测到 modCount！=expectedmodCount  这个条件。如果集合发生变化时修改modCount值刚好又设置为了expectedmodCount值，则异常不会抛出。因此，不能依赖于这个异常是否抛出而进行并发操作的编程，这个异常只建议用于检测并发修改的bug。

* 场景：java.util包下的集合类都是快速失败的，不能在多线程下发生并发修改（迭代过程中被修改），比如ArrayList 类。

### 安全失败（fail—safe）

* 采用安全失败机制的集合容器，在遍历时不是直接在集合内容上访问的，而是先复制原有集合内容，在拷贝的集合上进行遍历。

* 原理：由于迭代时是对原集合的拷贝进行遍历，所以在遍历过程中对原集合所作的修改并不能被迭代器检测到，所以不会触发Concurrent Modification Exception。

* 缺点：基于拷贝内容的优点是避免了Concurrent Modification Exception，但同样地，迭代器并不能访问到修改后的内容，即：迭代器遍历的是开始遍历那一刻拿到的集合拷贝，在遍历期间原集合发生的修改迭代器是不知道的。

* 场景：java.util.concurrent包下的容器都是安全失败，可以在多线程下并发使用，并发修改，比如CopyOnWriteArrayList类。

### 实现 ArrayList 线程安全的方法

* 使用 Vector 代替 ArrayList。（不推荐，Vector是一个历史遗留类）

* 使用 Collections.synchronizedList 包装 ArrayList，然后操作包装后的 list。

* 使用 CopyOnWriteArrayList 代替 ArrayList。

* 在使用 ArrayList 时，应用程序通过同步机制去控制 ArrayList 的读写。

### ArrayList 和 Vector 的区别

ArrayList 是在 JDK 1.2 时引⼊的，⽤于替代 Vector 作为主要的⾮同步动态数组实现。因为 Vector 所有的⽅法都使 ⽤了 synchronized 关键字进⾏同步，所以单线程环境下效率较低。

### CopyOnWriteArrayList&#x20;

CopyOnWriteArrayList就是线程安全版本的ArrayList。

它的名字叫`CopyOnWrite`——写时复制，已经明示了它的原理。

CopyOnWriteArrayList采用了一种读写分离的并发策略。CopyOnWriteArrayList容器允许并发读，读操作是无锁的，性能较高。至于写操作，比如向容器中添加一个元素，则首先将当前容器复制一份，然后在新副本上执行写操作，结束之后再将原容器的引用指向新容器。
