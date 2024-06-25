## Problem: Maximal Team Contribution Under IQ Constraint

### Description
Varun is organizing an event to form a new team for the Competitive Programming Club, aiming to maximize the total intelligence quotient (IQ) while ensuring team cohesiveness. Each candidate is evaluated based on their IQ and potential contribution to the team's success. The task is to select team members such that the total contribution is maximized, adhering to a rule that the difference in IQ between any two members must be less than a given threshold, `D`.

### Constraints
- `n (1 ≤ n ≤ 10^5)`: Number of candidates.
- `D (0 ≤ D ≤ 10^9)`: Maximum allowable difference in IQ levels between any two team members.
- `Contribution_i (0 ≤ Contribution_i ≤ 10^9)`: Potential contribution of the `i-th` candidate.
- `IQ_i (0 ≤ IQ_i ≤ 10^9)`: Intelligence quotient of the `i-th` candidate.

### Output
Print the maximum total contribution to the team's success achievable within the specified IQ difference limit.

### Example

#### Input
```
D = 10
Contribution - 100 200 150 300 250 
IQ - 30 20 40 35 25
```

#### Output
```
450
```

### Note
- The IQ difference between any two team members must be less than `D`, not less than or equal to `D`.
- In the example, the selected members with IQs of 35 and 40 yield the maximum contribution of 300 + 150 = 450. This scenario respects the IQ difference constraint of less than 10 between any two members.