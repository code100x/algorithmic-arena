### Problem Description

You are given an array **A** of **N** integers. Your task is to count the number of inversions in the array. An inversion is a pair of indices `(i, j)` such that `i < j` and `A[i] > A[j]`.

### Problem Constraints

- `1 <= N <= 100,000`
- `1 <= A[i] <= 10^9`

### Input Format

- The only argument given is the integer array **A**.

### Output Format

- Return a single integer representing the number of inversions in the array.

### Example Input

**Input 1:**

```
A = [3, 2, 1]
```

**Input 2:**

```
A = [1, 2, 3]
```

### Example Output

**Output 1:**

```
3
```

**Output 2:**

```
0
```

### Example Explanation

**Explanation 1:**

There are 3 inversions:
- **(1, 2)** where **3 > 2**
- **(1, 3)** where **3 > 1**
- **(2, 3)** where **2 > 1**

**Explanation 2:**

There are no inversions because the array is already sorted in ascending order.