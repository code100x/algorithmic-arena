
# Problem: Sum Of Elements

## Problem Statement:
You are given an array of `n` integers. For each element at index `i`, you need to find:
1. The nearest smaller element to the left of `i` (if no such element exists, use 0).
2. The nearest bigger element to the right of `i` (if no such element exists, use 0).

Then, return a new array where each element at index `i` is the sum of the nearest smaller element to the left and the nearest bigger element to the right.

## Input:
- An integer `n` representing the size of the array.
- An array `arr` of size `n` consisting of integers where \( 1 \leq n \leq 10^5 \).

## Output:
- Return an array of size `n` where each index contains the sum of the nearest smaller element to the left and the nearest bigger element to the right, or 0 if such an element does not exist.

## Example:

### Example 1:

**Input:**
```
n = 6
arr = [3, 7, 1, 7, 8, 4]
```

**Output:**
```
[7, 11, 7, 9, 7, 1]
```

**Explanation:**
- For index 0 (`3`), no smaller element on the left and the nearest bigger element on the right is `7` → `0 + 7 = 7`.
- For index 1 (`7`), the nearest smaller element on the left is `3` and the nearest bigger element on the right is `8` → `3 + 8 = 11`.
