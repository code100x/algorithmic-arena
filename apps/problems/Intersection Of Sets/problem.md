## Problem: Intersection of Two Sorted Arrays

### Description
Given two arrays of integers, `A` and `B`, which are sorted in non-decreasing order, find and return the intersection of these two arrays. The intersection of two arrays consists of the elements that are common to both arrays.

### Constraints
- `A` and `B` are arrays of integers.
- Both `A` and `B` are sorted in non-decreasing order.
- The size of `A` is in the range `[1, 10000]`.
- The size of `B` is in the range `[1, 10000]`.
- Each element in both arrays is in the range `[-10^9, 10^9]`.

### Output
- Return a sorted list of integers representing the intersection of `A` and `B`.
- Each element in the intersection must appear as many times as it shows in both arrays (i.e., the intersection must be a multiset).

#### Test case 1

Input:

```
    A: [1 2 3 3 4 5 6]
    B: [3 3 5]
```

Output:

```
[3 3 5]
```

#### Test case 2


Input:
```
    A: [1 2 3 3 4 5 6]
    B: [3 5]
```

Output: 
```
[3 5]
```

### Note
- If there are no common elements, the output should be an empty list.
- The solution should ideally have a time complexity better than O(n * m), where `n` is the length of `A` and `m` is the length of `B`.

