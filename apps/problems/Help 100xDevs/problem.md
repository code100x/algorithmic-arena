## Problem : Help 100xDevs

### Description
Given an array `n`
of integers, the task is to choose any subsequence of length `k`
such that the sum of the elements in this subsequence is the smallest possible. A subsequence of an array is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements.

Your task is to figure out the subsequence that minimizes the sum.


### Constraints
- `1 ≤ N ≤ 10^5`
- `1 ≤ k ≤ N`
-  All the elements of the array are in the range `[-10^9 , 10^9]`

### Output
For each test case, output a line containing `k` space-separated integers denoting the subsequence with the smallest sum. If multiple subsequences have the same sum, any one of them may be printed, but the order of elements must match their original order in the input array.

### Example

#### Test Case 1

**Input:**
```
5 2
4 2 1 5 3
```

**Output:**
```
2 1
```

#### Test Case 2

**Input:**
```
5 3
10 -1 -5 2 4
```

**Output:**
```
-1 -5 2
```

#### Test Case 3

**Input:**
```
5 1
1 3 5 7 9
```

**Output:**
```
1
```

#### Test Case 4

**Input:**
```
5 5
5 4 3 2 1
```

**Output:**
```
5 4 3 2 1
```

#### Test Case 5

**Input:**
```
5 4
-1 -2 -3 -4 0
```

**Output:**
```
-1 -2 -3 -4
```

### Note
- For the first subtest case, the two smallest numbers in the array are `1` and `2`. Selecting these numbers ensures the smallest sum for a subsequence of length `2`, with the order preserved from the original array.
- In the second subtest case, the three smallest numbers in the array are -`5, -1, and 2`. This selection provides the smallest sum for a subsequence of length `3`, maintaining their order from the original array.
- The third subtest case demonstrates that with `k=1`, the goal is to find the single smallest number, which is `1`, resulting in the smallest possible sum for a subsequence of length `1`
- Note that for the first test case, `1 2` is not a correct answer
The order of elements in the printed subsequence must match their original order in the input array. Even if the selected subsequence has the smallest sum, printing it in the wrong order will result in a wrong answer. This rule emphasizes the importance of preserving the sequence's order as it appears in the input.

