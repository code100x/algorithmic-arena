
## Problem: Maximum Xor Secondary

### Description
You're given a sequence of distinct positive integers `s1, s2, ..., sn` (where `n > 1`). The task is to find the maximum lucky number among all possible subarrays of this sequence.

#### Definitions:
1. **Subarray**: A contiguous subsequence of the array.
2. **Second maximum element**: In a subarray of size greater than 1, the second maximum element is the element that is smaller than the maximum element but larger than all other elements.
3. **Lucky number**: The lucky number of a subarray is the result of the bitwise XOR operation between the maximum element and the second maximum element of that subarray.

You need to find the maximum lucky number among all possible subarrays.

### Input
- The first line contains an integer `n` (1 < n ≤ 10^5) — the length of the sequence.
- The second line contains `n` distinct integers `s1, s2, ..., sn` (1 ≤ si ≤ 10^9).

### Output
Print a single integer — the maximum lucky number among all possible subarrays.

### Example

#### Input 1:
```
5
5 2 1 4 3
```

#### Output 1:
```
7
```

#### Input 2:
```
5
9 8 3 5 7
```

#### Output 2:
```
15
```

### Explanation:
In the first sample, for the subarray `s[4..5] = {4, 3}`, the lucky number is `4 ^ 3 = 7`. Similarly, for subarray `s[1..2] = {5, 2}`, the lucky number is `5 ^ 2 = 7`. Thus, the maximum lucky number is `7`.

In the second sample, the subarray `s[2..5] = {8, 3, 5, 7}` yields the lucky number `8 ^ 7 = 15`, which is the maximum lucky number.
```