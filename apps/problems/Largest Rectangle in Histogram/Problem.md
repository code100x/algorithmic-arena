## Problem: Largest Rectangle in Histogram

### Description
Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, find the area of the largest rectangle in the histogram.

### Constraints
- `1 <= heights.length <= 10^5`
- `0 <= heights[i] <= 10^4`

### Input Format
The first and only argument is an array of integers `heights`.

### Output Format
Return the area of the largest rectangle in the histogram.

### Example Input
```
heights = [2,1,5,6,2,3]
```

### Example Output
```
10
```

### Explanation
- **Explanation 1:**
  - The largest rectangle has an area of `10` units. It is formed by `heights[2]` and `heights[3]` with height `5` and width `2`.