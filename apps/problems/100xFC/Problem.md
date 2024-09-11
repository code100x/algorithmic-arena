## Problem: Maximum Ticket Sales

### Description
Your favorite football team, 100xFC, has qualified for the Kirat League Final. You arrives at the Stadium and see a line of fans waiting to buy tickets. The stadium has `M` seating rows, each with a different number of available seats. The price of a ticket depends on the row: if a row has `K` empty seats, the price of a ticket in that row is `K` pounds.

Fans buy tickets one by one. Each fan will always choose a seat from the row with the most available seats (because the price is the highest). After each ticket sale, the number of available seats in that row decreases by 1.

Your task is to calculate the maximum total amount of money 100xFC will earn from selling tickets to `N` fans.

### Input
- The first argument is 'M'
- The second argument is 'N
    - `M` is the number of seating rows in the stadium.
    -  `N` is the number of fans waiting to buy tickets.
- The third argument is an array `A` of length `M` , where `A[i]` represents the number of available seats in the `i-th` row.

### Output
Return a single integer representing the maximum pounds the club will earn from selling tickets.

### Constraints
- 1 ≤ M ≤ 100,000
- 1 ≤ N ≤ 100,000
- 0 ≤ A[i] ≤ 1,000

### Example

#### Input:
```
3 4
1 2 4
```

#### Output:
```
11
```

### Explanation
In this example, there are 3 rows and 4 fans:
- The 1st fan buys a ticket for the row with 4 seats, which costs 4 pounds.
- The 2nd fan buys a ticket for the same row (now with 3 seats), which costs 3 pounds.
- The 3rd fan buys a ticket for the row with 2 seats (the 2nd row), which costs 2 pounds.
- The 4th fan buys a ticket for the same row (now with 1 seat), which also costs 2 pounds.

Total money earned is: `4 + 3 + 2 + 2 = 11 pounds`.
