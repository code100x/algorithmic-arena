## Problem: Kth Smallest Sum

### Description


Given two arrays `A` of size `N` and `B` of size `M`, and an integer `K`, you need to create a new array `C` of size `N*M` such that each element in `C` is the sum of an element from `A` and an element from `B`. Specifically, the array `C` will be formed by calculating `A[i] + B[j]` for all `1 ≤ i ≤ N` and `1 ≤ j ≤ M`. Your task is to find the Kth smallest element in the array `C`.

### Explanation
To clarify, consider arrays `A` and `B` as follows:
- Array `A` contains `N` elements: `A = [a1, a2, ..., aN]`
- Array `B` contains `M` elements: `B = [b1, b2, ..., bM]`

By adding every possible pair of elements `(ai, bj)` where `ai` is an element from `A` and `bj` is an element from `B`, you will generate a new array `C`. Array `C` will have `N * M` elements, with each element being the sum of an element from `A` and an element from `B`.

For example, if `A = [1, 2]` and `B = [3, 4]`, then the possible sums (i.e., elements of array `C`) would be:
- `1 + 3`
- `1 + 4`
- `2 + 3`
- `2 + 4`

So, array `C` would be `[4, 5, 5, 6]`.

The challenge is to find the Kth smallest element in this array `C` efficiently given the constraints.


### Constraints
- `1 ≤ N ≤ 10^6`, `1 ≤ M ≤ 10^6`, `1 ≤ K ≤ min(1e9,N*M)`.
- `(0 ≤ A[i] ≤ 10^4)`.
-  `(0 ≤ B[j] ≤ 10^4)`.
-  `min(N, M) ≤ 10^5`.

### Output Format
For each test case, print the Kth smallest element in the array `C`.

### Example

#### Input

```
N = 3
M = 3
K = 6
A = [1,2,3]
B = [4,5,6]
```

#### Output

```
7
```

