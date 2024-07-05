## Broken Subarray Sum

### Problem Description
Given an array **A**, find the number of broken subarrays with sum **B**.

A broken subarray is defined as the concatenation of the remaining array after removing any subarray from the array. More formally, it is a concatenation of a non-overlapping prefix and suffix of the array (Prefix and Suffix can be empty).

### Problem Constraints
- `1 <= N <= 1e5`
- `1 <= A[i] <= 1e4`
- `1 <= B <= 1e9 `

### Input Format
The first argument is an integer array A.
The second argument is an integer B, denoting the required sum.

### Output Format
Return a single integer denoting the number of broken subarrays with sum equal to B.

### Example Input
```
Input 1:
A = [1, 2, 3, 1, 2, 3]
B = 6

Input 2:
A = [1, 4, 2, 3]
B = 10
```

### Example Output
```
Output 1:
4

Output 2:
1
```

### Example Explanation
**Explanation 1:** By removing any subarray of length 3, we can get our broken subarrays. Therefore, the answer is 3.

**Explanation 2:** We cannot remove any elements, but the whole array is also considered as a broken subarray. So, the answer is 1.