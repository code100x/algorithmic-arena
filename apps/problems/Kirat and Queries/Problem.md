
## Problem: Kirat and Queries

### Description
Kirat gave Varun an integer array `A` and asked him to find, for each index `i`, the product of the largest, second largest, and third largest integers in the range `[1, i]`.

Note: Two numbers can have the same value, but they must come from distinct indices.

### Input
- The first argument contains an array of length `N`, where the `i-th` element represents the value `A[i]` (-1,000,000 ≤ A[i] ≤ 1,000,000).

### Output
Return an array of length `N`, where each element corresponds to the product of the largest, second largest, and third largest integers in the range `[1, i]`. 
- If there are fewer than three integers in the range `[1, i]`, the corresponding element in the output array should be `-1`.

### Constraints
- `1 ≤ N ≤ 100,000`
- `-1,000,000,000 ≤ A[i] ≤ 1,000,000,000`

### Example

#### Input:
```
5
1 2 3 4 5
```

#### Output:
```
[-1, -1, 6, 24, 60]
```

### Explanation
- For the first two indices, there are fewer than three elements, so the output is `-1`.
- For index 3, the top three numbers are 3, 2, and 1, whose product is `3 * 2 * 1 = 6`.
- For index 4, the top three numbers are 4, 3, and 2, whose product is `4 * 3 * 2 = 24`.
- For index 5, the top three numbers are 5, 4, and 3, whose product is `5 * 4 * 3 = 60`.
