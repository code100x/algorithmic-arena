
## Problem: Balanced Parentheses

### Description
You are given a string consisting only of opening and closing parentheses '(' and ')'. Your task is to determine if the parentheses in the string are balanced.

A string of parentheses is considered balanced if:
1. It is empty
2. It has the form '(A)' where A is a balanced string
3. It has the form 'AB' where both A and B are balanced strings

For example, '(()())', '(())', and '()()' are balanced, while '(()' and ')()(' are not balanced.

### Input
A string `s` of length `n`, consisting only of characters '(' and ')'.

### Output
Return 'YES' if the string is balanced, and 'NO' otherwise.

### Sample
**Input**
```
(()())
```

**Output**
```
YES
```

### Notes
This string is balanced because it follows rule 2 and 3: it has the form '(A)' where A is '()()' which is also balanced.

