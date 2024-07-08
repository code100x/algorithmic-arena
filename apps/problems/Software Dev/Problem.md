## Problem: Project Decorations

### Description
You are managing a software development team, and you need to assign developers to projects. You have `f` frontend engineers, `b` backend engineers, and `d` devops engineers. To fully staff a single project, you need exactly three engineers, there can be 2 engineers of the same type but all 3 should not be the same.

What is the maximum number of projects that can be fully staffed given the number of developers of each specialization?

### Input
The input consists of a single line containing three integers `f`, `b`, and `d` (0 ≤ `f`, `b`, `d` ≤ 2·10^9) — the number of frontend, backend, and database engineers respectively. The numbers are separated by exactly one space.

### Output
Print a single integer — the maximum number of projects that can be fully staffed in the required manner.

### Example

#### Input
```
5 4 3
```

#### Output
```
4
```

#### Input
```
1 1 1
```

#### Output
```
1
```

#### Input
```
2 3 3
```

#### Output
```
2
```

### Note

In the first example, you can fully staff the projects with the following sets of developers: "frontend-backend-backend", "backend-devops-devops", "devops-frontend-frontend", "frontend-frontend-backend", where "frontend", "backend", and "devops" represent the specializations of the developers, respectively.