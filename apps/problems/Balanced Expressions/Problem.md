### Problem Statement: **Balanced Expressions**

#### Description
Given a string consisting of digits with a length of `N`, your task is to determine all the possible distinct values that can be achieved by inserting exactly `N - 1` arithmetic operators (either `'+'` or `'-'`) between the digits. After calculating all possible values, you need to output these values in sorted order.

#### Input
The input is a single string `S` of length`N` (`1 ≤ N ≤ 21`), consisting only of digit characters (`0 - 9`).

#### Output
Return all the distinct values you can get by all the combinations.

#### Example

**Input**
```
123
```

**Output**
```
-4 0 2 6
```

**Explanation**

From the input string "123", we can form the numbers using `n-1 = 2` operators as follows:

```
1 + 2 + 3 = 6
1 + 2 - 3 = 0
1 - 2 + 3 = 2
1 - 2 - 3 = -4
```

After processing all combinations, the distinct results in sorted order are: `-4, 0, 2, 6`. The output shows the number of distinct results followed by each result in sorted order.

#### Constraints
- You must use exactly `n-1` arithmetic operators.
- Each operation is either addition or subtraction.
- The answer vector should be sorted