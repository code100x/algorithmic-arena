
# Problem: Monster Game

## Problem Statement:
You are facing the final boss in your favorite video game. The boss enemy has `h` health. Your character has `n` attacks. The `i`-th attack deals `a[i]` damage to the boss but has a cooldown of `c[i]` turns, meaning the next time you can use this attack is on turn `x + c[i]` if your current turn is `x`.

Each turn, you can use all attacks that are not currently on cooldown, all at once. If all attacks are on cooldown, you do nothing for the turn and skip to the next turn.

Initially, all attacks are not on cooldown. You need to determine how many turns it will take to defeat the boss. The boss is defeated when its health becomes 0 or less.

## Input:
- Two arrays and an integer `h`:
  1. An integer `h` (`1 ≤ h ≤ 2⋅10^5`) – the health of the boss.
  2. An array of size `n`, `a[1], a[2], ..., a[n]` (1 ≤ a_i ≤ 2⋅10^5) – the damage values of the attacks.
  3. An array of size `n`, `c[1], c[2], ..., c[n]` (1 ≤ c_i ≤ 2⋅10^5) – the cooldown times of the attacks.

## Output:
- An integer representing the minimum number of turns required to beat the boss.

## Example:

### Input:
```
h = 3
a = [2, 1]
c = [2, 1]
```

### Output:
```
1
```

### Input:
```
h = 50
a = [5, 6, 7]
c = [5, 6, 7]
```

### Output:
```
15
```

## Explanation:
For the first example, you can use attacks 1 and 2 on the first turn, dealing a total of 3 damage, and slaying the boss in 1 turn.

For the second example, the boss can be defeated in 15 turns by carefully selecting attacks while considering cooldowns.

### Notes:
- The attacks and cooldown values play a critical role in determining how long it will take to defeat the boss.
- Each attack can only be used again after the respective cooldown period.