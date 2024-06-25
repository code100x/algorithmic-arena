## Problem: B. Maximise Mex

### Description
You are given an array `a` containing `N` integers. You are allowed to perform up to `k` operations on the array. In a single operation, you can:

- Select any index `i` in the array.
- Change the value of `a[i]` to any integer of your choice.

Your goal is to maximize the **mex** of the array after performing at most `k` operations. 

The **mex** is defined as the smallest non-negative integer that is *not* present in the array.

### Constraints
- `1 ≤ N ≤ 10^5`, the size of the array.
- `−10^9 ≤ a[i] ≤ 10^9`, each element in the array.
- `0 ≤ k ≤ N`, the number of operations allowed.

### Output
- For each test case, return the maximum possible mex you can achieve after performing at most `k` operations.

#### Example

**Input:**
```
5 2
1 3 5 7 9
```

**Output:**
```
4
```

**Input:**
```
4 3
2 2 2 2
```

**Output:**
```
4
```

**Input:**
```
3 1
0 1 2
```

**Output:**
```
3
```

### Explanation
- For the first test case, you can change `7` to `0` and `9` to `2` to make the array `[1, 3, 5, 0, 2]`. The smallest missing integer is `4`.
- In the second test case, changing three of the `2`s to `0`, `1`, and `3` will give the array `[0, 1, 2, 3]` with the mex being `4`.
- For the third test case, after changing any one of the integers to `3`, the array becomes `[0, 1, 2, 3]` with a mex of `3`.