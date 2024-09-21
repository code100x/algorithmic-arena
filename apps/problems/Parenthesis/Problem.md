## Problem: Even Positions

### Description
Kirat has a regular bracket sequence `s` of length `n` (where `n` is even). The cost of a regular bracket sequence (RBS) is defined as the sum of distances between pairs of corresponding opening and closing brackets.

Kirat lost all characters at odd positions (1st, 3rd, etc.). Only characters at even positions remain, and they consist of either '(' or ')'. Kirat needs to restore the missing brackets at odd positions in such a way that the sequence forms a valid RBS with the minimum possible cost.

### Input
  - The second line contains a string `s` of length `n` `(2 ≤ n ≤ 2⋅10^5)`  where all characters at odd positions are `_` and all characters at even positions are either `(` or `)`.
  
  - Additional constraints:
    - The string can be restored to at least one regular bracket sequence.

### Output
For each test case, print one integer — the minimum cost of the regular bracket sequence that can be obtained from `s` by replacing `_`-s with brackets.

### Example Input
```

_(_)_)


_)


_)_)_)_)


_(_)_(_)
```

### Example Output
```
5

1

4

8
```

### Explanation
In the first test case, the optimal way to restore the sequence is `s = (())()`, which has the cost `3 + 1 + 1 = 5`.

In the second test case, the only possible sequence is `()`, which has a cost of `1`.

In the third test case, the only possible sequence is `()()()()`, which has a cost of `1 + 1 + 1 + 1 = 4`.

In the fourth test case, the optimal sequence is `s = (())(())`, which has a cost of `3 + 1 + 3 + 1 = 8`.

