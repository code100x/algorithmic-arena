**Problem Description**  
You are given an array **A** of length **N**. You need to choose **4 non empty disjoint subsequences** of A, let's call them as **a1, a2, a3, a4**.

Disjoint means if ith index was **used in one subsequence**, then it **can not be used in other subsequences**.

Let's call the **sum of elements** in these subsequences as **s1, s2, s3, s4**.

Your task is to **maximize s1 * s3 such that s1 = s2 and s3 = s4**. There can be many ways to choose a1, a2, a3, a4, but final answer will be unique.

**Note:** if it is not possible to find such subsequences then return **-1**.

**Problem Constraints**  
- `4 <= N <= 10 ` 
- `1 <= A[i] <= 10`

**Input Format**  
First argument is an integer array A of size N.

**Output Format**  
Return single integer denoting the answer.

**Example Input**  
```
A = [7, 7, 3, 3, 10, 9, 4, 3, 3, 4]
```

**Example Output**  
```
150
```

**Example Explanation**  
One possible way of choosing the subsequences is:  
a1 as `[ A[1] , A[2] ] = [7, 3]` hence s1 = 10.  
a2 as `[ A[4] ] = [10]` hence s2 = 10.  
a3 as `[ A[0], A[6], A[9] ] = [7, 4, 4]` hence s3 = 15.  
a4 as `[ A[5], A[7], A[8] ] = [9, 3, 3]` hence s4 = 15.  
So s1 * s3 = 10 * 15 = 150.  

Note that we can not achieve more than 150.