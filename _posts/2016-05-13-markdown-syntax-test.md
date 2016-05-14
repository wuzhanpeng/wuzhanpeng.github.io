---
layout: default
title:  "Simple test on Markdown syntax"
date:   2016-05-13 22:37:00
categories: blog
tags: 
  - Github Pages
  - Markdown
  - Functional test
---

# Simple test on Markdown syntax

This is the main text.

### Code sample
`Java`

### Official code sample
{% highlight java %}
package Array;

public class Plus_One_66 {
	
	public class Solution {
	    public int[] plusOne(int[] digits) {
	    	int plus = 1;
	        for (int i = digits.length - 1; i > -1; -- i) {
	        	int sum = digits[i] + plus;
	        	digits[i] = sum%10;
	        	plus = sum/10;
	        }
	        if (0 != plus) {
	        	int[] nums = new int[digits.length + 1];
	        	nums[0] = plus;
	        	for (int i = digits.length - 1; i > -1; -- i) {
	        		nums[i + 1] = digits[i];
	        	}
	        	return nums;
	        }
	        return digits;
	    }
	}

	public static void main(String[] args) {
		int[] d1 = new Plus_One_66().new Solution().plusOne(new int[]{9, 9, 9, 9});
		for (int x : d1) { System.out.printf("%d", x); }
	}

}
{% endhighlight %}

### Link sample
[My GitHub](https://github.com/wuzhanpeng)
[2nd link][github_address]
![](http://ww4.sinaimg.cn/bmiddle/aa397b7fjw1dzplsgpdw5j.jpg)

[github_address]: https://github.com/wuzhanpeng

### Quote sample
> This is a quote.

### Fonts & List
1. *italic*
2. **Bold**
3. ***dont know***   

- this
- is
- list

### Line
******
______
------
