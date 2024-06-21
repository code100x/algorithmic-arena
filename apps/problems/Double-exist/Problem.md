## Check If Double Exist Or Not

Given an array arr of integers, check if there exist two indices i and j such that :

* i != j
* 0 <= i, j < arr.length
* arr[i] == 2 * arr[j]

For example


Input

```
[1, 2, 3, 4, 5, 6, 10]
```

Output
```
True
```
Input

```
[2, 32, 5, 6, 1, 5, 8]
```

Output
```
True
```
Input

```
[0, 10, 21, 22, 23]
```

Output
```
False

```



Constraints:

2 <= arr.length <= 500 <br>
-10<sup>3</sup> <= arr[i] <= 10<sup>3</sup>