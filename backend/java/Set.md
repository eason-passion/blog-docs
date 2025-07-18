## Set

### HashSet 的底层实现?

HashSet 底层就是基于 HashMap 实现的。

HashSet 主要⽤于去重，⽐如，我们需要统计⼀篇⽂章中有多少个不重复的单词，就可以使⽤ HashSet 来实现。

HashSet 会⾃动去重，因为它是⽤ HashMap 实现的，HashMap 的键是唯⼀的，相同键会覆盖掉原来的键，于是 第⼆次 add ⼀个相同键的元素会直接覆盖掉第⼀次的键。

### HashSet 和 ArrayList 的区别

ArrayList 是基于动态数组实现的，HashSet 是基于 HashMap 实现的。&#x20;

ArrayList 允许重复元素和 null 值，可以有多个相同的元素；HashSet 保证每个元素唯⼀，不允许重复元素， 基于元素的 hashCode 和 equals ⽅法来确定元素的唯⼀性。&#x20;

ArrayList 保持元素的插⼊顺序，可以通过索引访问元素；HashSet 不保证元素的顺序，元素的存储顺序依赖 于哈希算法，并且可能随着元素的添加或删除⽽改变。

### HashSet 怎么判断元素重复，重复了是否 put

HashSet 的 add ⽅法是通过调⽤ HashMap 的 put ⽅法实现的，所以 HashSet 判断元素重复的逻辑底层依然是 HashMap 的底层逻辑。