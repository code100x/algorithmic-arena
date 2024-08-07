
## Bitwise AND Range Query

### Problem Statement

You are given an array `A` of `N` positive integers. You need to process `Q` queries. Each query is of the form `L R K`, where you need to find the number of integers `X` in the range `[L, R]` (inclusive) such that `(A[L] & A[L+1] & ... & A[X]) >= K`, where `&` denotes the bitwise AND operation.

### Input

- `N` and `Q` (`1 <= N, Q <= 100,000`).
- `A_1, A_2, ..., A_N` (`1 <= A_i <= 1,000,000,000`).
-  `L`, `R`, and `K` (`1 <= L <= R <= N`, `0 <= K <= 1,000,000,000`).

### Output

Return an array 

### Sample Input

```
N = 5 
Q = 3
A = [7 ,5 ,2 ,3 ,9]
Queries = [ [1 ,3 ,2], [ 2 ,4 ,1 ], [ 1 ,5 ,3 ] ]
```

**NOTE** : The queries are given in 3 different arrays  L , R , K there the ith element is the l,r,k of the ith query

### Sample Output

```
2
0
2
```

### Explanation

- **Query 1:** `(7 & 5) =5 >= 2` and `(7 & 5 & 2) = 0 < 2`, so there are 2 valid `X` values.
- **Query 2:** there are no valid `X` values.
- **Query 3:** `(7 & 5) =5 >= 2` and `(7 & 5 & 2) = 0 < 2`, so there are 2 valid `X` values.