
## Problem : Arranging Coins

### Description
There is a building of infinite floor you are at the ground floor (`0-th Floor`) and you have `x` coins with you. To go the `i-th` floor you have to fullfill 2 conditions.
- You have visited the `i-1th floor`.
- You have atleast `2*i + 1` coins.

After visiting the floor `2*i + 1` coins are deducted from your balance.

For example, if you have `4` coins you can go to the first floor (since you have already visited 0-th floor). After coming to the `1st` floor your balance becomes `3`, Then you visit the `2nd` floor since you visited the 1st floor and then your balance becomes 0.
```
0th floor - started here
1st floor - visited here , 1 coin gets deducted , balance becomes 3
2nd floor - visited here , 3 coins get deducted , balance becomes 0
_
```
### Constraints
- `1 ≤ n ≤ 2 * 10^9`

### Output
Return the total number of floors that can be visited with `x` coins at the start.

### Example

#### Test Case 1

**Input:**
```
4
```

**Output:**
```
2
```

#### Test Case 2

**Input:**
```
8
```

**Output:**
```
2
```

