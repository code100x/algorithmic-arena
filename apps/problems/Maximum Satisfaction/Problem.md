
### Maximum Satisfaction

**Problem Description:**  
Given an array of integers **A** of size **N** denoting the quality of the fruits. **A[i]** represents the fruit quality of the **i-th** fruit. Varun needs to pick **four** fruits, but he needs to pick them so that his satisfaction value will be maximum. If **a, b, c,** and **d** are fruit quality of the four fruits picked, then the **`satisfaction value(a, b, c, d) = (a & b & c & d)`** where **&** is bitwise **AND** operator. Find the maximum satisfaction value Varun can obtain.

**Problem Constraints:**  
- `4 <= N <= 100,000`
- `1 <= A[i] <= 2^30`

**Input Format:**  
The only argument given is the integer array A.

**Output Format:**  
Return the maximum satisfaction value Varun can obtain.

**Example Input:**  
Input 1:
```
A = [10, 20, 15, 4, 14]
```
Input 2:
```
A = [2, 2, 7, 15]
```

**Example Output:**  
Output 1:
```
4
```
Output 2:
```
2
```

**Example Explanation:**  
Explanation 1:
```
Varun can pick fruits with fruits quality 20, 15, 4, 14 and satisfaction value is (20 & 15 & 4 & 15) = 4 
```
Explanation 2:
```
Varun will pick fruits with fruits quality 2, 2, 7, 15 and satisfaction value is (2 & 2 & 7 & 15) = 2
```