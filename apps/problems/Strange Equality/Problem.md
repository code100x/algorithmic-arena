## Problem Description

Given an integer **A**.
Two numbers, X and Y, are defined as follows:

- X is the **greatest number smaller** than A such that the XOR sum of X and A is the same as the sum of X and A.
- Y is the **smallest number greater** than A, such that the XOR sum of Y and A is the same as the sum of Y and A.

Find and **return** the XOR of X and Y.

**NOTE 1:** XOR of X and Y is defined as X ^ Y where '^' is the BITWISE XOR operator.

## Problem Constraints

- `1 <= A <= 10^9`

## Input Format

First and only argument is an integer A.

## Output Format

Return an integer denoting the XOR of X and Y.

## Input

```
A = 5
```

## Output

```
10
```