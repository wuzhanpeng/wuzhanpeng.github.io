---
layout: default
title:  "[LeetCode Solutions] Algorithm Notes"
date:   2016-06-12 03:00:00
categories: blog
tags: 
  - LeetCode
  - Algorithms
---

<!-- Some JS elements -->
<div class="elevator-button" title="Back to Content"></div>
<script>
var offset = 0;
// https://github.com/tholman/elevator.js
window.onload = function() {
  var elevator = new Elevator({
    element: document.querySelector('.elevator-button'),
    targetElement: document.querySelector('#content'),
    duration: 1000
  });
  offset = elevator.getVerticalOffset();
}
window.onscroll = function() {
	if( $(window).scrollTop() > offset )
		$(".elevator-button").fadeIn(1000);
	else
		$(".elevator-button").fadeOut(1000);
}
</script>

# [LeetCode Solutions] Algorithm Notes
------

<a name="content"></a>

## Content  

- <a href="#ksum">K-Sum Problem</a>
- <a href="#construct_binary_tree_from_traversal">Construct Binary Tree from Traversal</a>
- <a href="#permutation_or_combination">Permutation or Combination Problem</a>
- <a href="#path_sum">Path Sum Problem</a>
- <a href="#topological_sorting">Topological sorting</a>

------

<a name="ksum"></a>

## K-Sum Problem [**`(More information)`**](http://www.sigmainfy.com/blog/summary-of-ksum-problems.html)  

暴力解K-Sum问题其实也就是求输入数组中所有长度为K的子集的问题，<u>复杂度为O(N^K)</u>

### 2Sum  

> Problems: [(E) Two Sum](https://leetcode.com/problems/two-sum/)

思路：这里有Two pointers和Hash两种思路。  

- **Two Pointers**: 先将输入数组排序，然后置头尾两个指针i、j。如果指针指向的两个数之和sum小于target的话，指针i后移；反之， 指针j前移。如果恰好等于target的话则保存结果。这个过程执行直至指针i、j相等。<u>复杂度为 O(N log N)</u>  

```java
// Sample
int i = beg, j = end;
while (i < j) {
	int sum = nums[i] + nums[j];
	if (sum == target) {
		// TODO
		++ i; -- j;
	} else if (sum < target) { ++ i; }
	else { -- j; }
}
```  
- **Hash**:  遍历输入数组同时维护一个Hash表，如果`target - num`存在Hash表中，则得到结果；否则将`num`加到Hash表中。<u>复杂度为O(N)</u>  

```java
// Sample
HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
for (int i = 0; i < nums.length; ++ i) {
	if (map.containsKey(target - nums[i])) {
		// TODO
	}
	map.put(nums[i], i);
}
```

### 3Sum  

> Problems: [(M) 3Sum](https://leetcode.com/problems/3sum/) \| [(M) 3Sum Closest](https://leetcode.com/problems/3sum-closest/)

思路：3Sum的解题思路是建立在2Sum上的。在输入数组`nums`已排序的基础上，选定一个数`nums[k]`，然后对余下的`nums[k+1 .. n]`执行2Sum的过程。这个思路可以推广到K-Sum问题，而且归根到底还是2Sum问题。<u>复杂度为O(N^2)</u>

***`Note:`*** 因为题目要求不能有重复的triplet，在不使用Set的情况下，我们可以利用排序后的特性，遇到连续的重复的数字只需要计算、判断一次，余下的可以直接略过。举个例子，输入数组为`[1, 1, 2, -3]`，如果不忽略第二个`1`，则答案中会有两组`[1, 2, -3]`。

### 4Sum  

> Problems: [(M) 4Sum](https://leetcode.com/problems/4sum/)

思路：同上。4Sum问题退化成3Sum问题，然后解题，<u>复杂度O(N^3)</u>。不过这题还有一种思路，数组`nums`中的数两两组合生成新的数组`nums2`，然后对`nums2`执行2Sum操作，时间为O(N^2)+O(N)，也就是O(N^2)的复杂度。不过这里需要注意几点：  

1. `nums2`中的组合在2Sum中可能会有重叠。例如`nums: [1, 2, 3] => nums2: [[1,2], [1,3], [2,3]]`，当在2Sum中选择`[1,2], [2,3]`时，2就是重复的数字。  
2. 2Sum执行完毕后，结果中可能存在重复的quadruplet，如何判重。    

## Summary 
利用排序后递归地化简问题的这种思路`KSum => (k-1)Sum until k == 2`，可以将暴力解KSum问题的复杂度从O(N^K)降为O(N^(K-1))；另外对于特定的K，可能存在优于O(N^(K-1))的复杂度（引入Hash表）。

------

<a name="construct_binary_tree_from_traversal"></a>

## Construct Binary Tree from Traversal

二叉树遍历有前序（preorder，根-左-右）、中序（inorder，左-根-右）和后序（postorder，左-右-根）三种。前序和后序只能反映结点的父子关系，只有中序能够反映子结点的左右关系。因此，前序+中序和后序+中序能够构建出一棵完整的二叉树，而前序+后序则是不能的。

***`Note:`*** 前提条件是<u>二叉树中结点不能有相同的值</u>。  

### Construct Binary Tree from Preorder and Inorder Traversal

> Problems: [(M) Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

	        1                       pre: [1, 2, 4, 3, 5]
	      /   \
	     2     3                    in:  [2, 4, 1, 5, 3]
	    / \   / \
	null   4 5   null               post:[4, 2, 5, 3, 1]

思路：在前序遍历中，序列第一位一定是根结点；同时，中序遍历的序列可以依靠根结点划分左右子树（因为结点值唯一）。因此可以总结得到算法：  

1. 在pre序列中，从前往后取数val作为根结点。如：取[1, 2, 4, 3, 5]中第一个数，val = 1  
2. 在in序列中，找到val对应的位置（下标），然后划分in序列。如：[<u>2, 4</u>, 1, <u>5, 3</u>]，1的左边是以1为根结点的左子树的中序序列，右边的则为右子树。  
3. 对左、右子树区间递归地执行以上过程，当区间为空时返回。  

上述过程其实也算是一个DFS。这里有一个可以优化的地方，在中序序列中查找根结点值时，如果是线性查找则每次查询都要O(N)的复杂度；如果我们先使用中序序列建立键值对为<value, index>的哈希表，则以后每次查询的复杂度仅为O(1)。综上，优化后问题的<u>复杂度为O(N)</u>。  

### Construct Binary Tree from Inorder and Postorder Traversal

> Problems: [(M) Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

思路：前序和后序的序列有点镜像的感觉。前序建树时，值从左往右，遵循”根 => 左子结点 => ...“的顺序直至没有左树，然后创建右子结点；后序建树时，值从右向左，遵循”根 => 右子结点 => ...“的顺序直至没有右树，然后创建左子结点。其余的同上。

------

<a name="permutation_or_combination"></a>

## Permutation or Combination Problem

排列/组合问题一个常规的解法是使用回溯。来自[Wikipedia的伪代码](https://en.wikipedia.org/wiki/Backtracking)：

```
procedure bt(c)
  if reject(P,c) then return
  if accept(P,c) then output(P,c)
  s ← first(P,c)
  while s ≠ Λ do
    bt(s)
    s ← next(P,s)
```

简单来说，也就是在循环中调用递归调用自身。不难看出<u>最坏情况下算法复杂度为指数时间复杂度</u>。  

回溯法采用试错的思想，它尝试分步的去解决一个问题。当它通过尝试，发现现有的分步答案不能得到有效的正确的解答的时候，它将取消上一步甚至是上几步的计算，再通过其它的可能的分步解答再次尝试寻找问题的答案（回溯法逐步构造候选解，并且在确定某一部分候选解不可能补全成正确解之后放弃继续搜索这个部分候选解本身及其可以拓展出的子候选解，转而测试其他的部分候选解）。——摘自[中文维基](https://zh.wikipedia.org/wiki/%E5%9B%9E%E6%BA%AF%E6%B3%95)

***`Note:`*** 注意两点，<u>递归的终止条件</u>和<u>循环体内候选解的选择</u>。

### Permutation Problem

> Problems: [(M) Permutations](https://leetcode.com/problems/permutations/) \| [(M) Permutations II](https://leetcode.com/problems/permutations-ii/)

思路：

### Simple Combination Problem

> Problems: [(M) Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) \| [(M) Combination Sum](https://leetcode.com/problems/combination-sum/) \| [(M) Combination Sum II](https://leetcode.com/problems/combination-sum-ii/) \| [(M) Combinations](https://leetcode.com/problems/combinations/)

思路：单纯的组合问题，即求出所有可能的组合。如`(M) Letter Combinations of a Phone Number`即在数字对应字符的情况下，求出数字串对应的所有可能的字符串，数字串长度是确定的（递归的终止条件），而且每个数字对应的字符有限（组合的可能性在循环体现），套用上面给出的伪代码即可写出程序。使用递归的一大好处就是代码的思路很清晰。

另外在此类问题中，常要求结果中不能有重复的答案（*The solution set must not contain duplicate combinations*），这里以[(M) Combination Sum](https://leetcode.com/problems/combination-sum/)和[(M) Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)为例，Ⅰ的输入是一个集合（set，无重复元素），元素可被重复选择；Ⅱ的输入是普通数组（collection，可能有重复元素），元素最多只能被选一次；Ⅰ和Ⅱ均要求结果中不能有重复的答案。首先第一点，在Ⅰ中，（排序后）按照回溯的思路并不会出现重复的答案（集合的性质）；同样的解法放在Ⅱ的条件下就会出现问题，当数组中有重复元素的时候，Ⅱ的结果中就会有重复的答案，如`candidates=[2, 1, 5, 2] target=8`就会得到`[[1,2,5], [1,2,5]]`的答案；更深入的原因是：<u>在答案的相同的位置上，出现了符合题意的重复解</u>

	 / →2→ \
	1       5
	 \ →2→ /

因此，我们要保证答案中，相同位置上，相同的数字最多只能出现一次，简单修改伪代码为：

```
procedure bt(c)
  if reject(P,c) then return
  if accept(P,c) then output(P,c)
  s ← first(P,c)
  while s ≠ Λ do
    if contain(Set,c) then continue 	// new added
    else then Add(Set,c)		// new added
    bt(s)
    s ← next(P,s)
```

### Hybrid Combination Problem

> Problems: [(M) Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) \| [(M) Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)

思路：在组合的基础上混入其它问题，或在解题中利用回溯的思想。如`(M) Generate Parentheses`，本身是一个括号的配对问题（即左右括号配对），在左括号还没有达到最大数时（因此左括号数量在这里是递归的终止条件），左括号的右边可以是左括号或者是右括号；另外在回溯/递归的过程结束后，还要进行右括号的填充。

------

<a name="path_sum"></a>

## Path Sum Problem

> Problems: [(E) Binary Tree Paths](https://leetcode.com/problems/binary-tree-paths/) \| [(E) Path Sum](https://leetcode.com/problems/path-sum/) \| [(M) Path Sum II](https://leetcode.com/problems/path-sum-ii/)

思路：树的遍历问题，采用深度遍历（Depth-first Search），即可找出所有路径（root-to-leaf paths）。注意两点：1) 叶结点的判定，有一个子结点为null不一定就是叶结点，须两个子结点同时为null才算；2) 递归调用中注意变量的恢复。

------

<a name="topological_sorting"></a>

## Topological sorting

> Problems: [(M) Course Schedule](https://leetcode.com/problems/course-schedule/)

思路：

------