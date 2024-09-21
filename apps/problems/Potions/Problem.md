
## Problem: Maximum Potions

### Description
You are given `n` potions in a line, where potion 1 is on the far left and potion `n` is on the far right. Drinking a potion increases or decreases your health by a value `a[i]`. You start with `0` health and move from left to right, deciding at each potion whether to drink it or skip it.

Your task is to maximize the number of potions you can drink while ensuring that your health never becomes negative.

### Input
- The first argument is and array of length `n` where the `ith` element is the `ith`potions health change value.

### Constraints
- `1 ≤ n ≤ 200,000`
- `−10^9 ≤ a[i] ≤ 10^9`


### Output
Print a single integer — the maximum number of potions you can drink without your health becoming negative.

### Example

#### Input 1:
```
6
4 -4 1 -3 1 -3
```

#### Output 1:
```
5
```

### Explanation
In this example, you can drink 5 potions by choosing to drink the following potions:
- Potion 1 (+4 health)
- Potion 3 (+1 health)
- Potion 4 (-3 health)
- Potion 5 (+1 health)
- Potion 6 (-3 health)

It is not possible to drink all 6 potions because drinking all of them would result in negative health at some point.
