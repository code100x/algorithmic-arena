### Problem Description

Kirat is given an array, **A**, of **N** integers. In a particular operation, he can set any element of the array equal to **-1**. He wants your help in finding out the minimum number of operations required such that the maximum element of the resulting array is **B**. If it is not possible, then return **-1**.

### Problem Constraints

- `1 <= |A| <= 10^5`
- `1 <= A[i] <= 10^9`

### Input Format

- The first argument of input contains an integer array, **A**.
- The second argument of input contains an integer, **B**.

### Output Format

- Return an integer representing the answer.

### Example Input

**Input 1:**

```
A = [2, 4, 3, 1, 5]
B = 3
```

**Input 2:**

```
A = [1, 4, 2]
B = 3
```

### Example Output

**Output 1:**

```
2
```

**Output 2:**

```
-1
```

### Example Explanation

**Explanation 1:**

We need to remove elements **4** and **5** to make **3** the biggest element in the array, which requires two operations.

**Explanation 2:**

As **3** does not exist in the array, it is impossible to make it the maximum element, hence the answer is **-1**.