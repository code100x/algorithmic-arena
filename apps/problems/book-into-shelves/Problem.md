## Book Into Shelves

You are visiting a library that has a single row of bookshelves arranged from left to right. The shelves are represented by an integer array shelves where shelves[i] is the genre of the book on the ith shelf.

You want to collect as many books as possible. However, the librarian has some strict rules that you must follow:

* You only have two boxes, and each box can only hold a single genre of book. There is no limit on the number of books each box can hold.

* Starting from any shelf of your choice, you must pick exactly one book from every shelf (including the starting shelf) while moving to the right. The picked books must fit in one of your boxes.

* Once you reach a shelf with a book that cannot fit in your boxes, you must stop.

Given the integer array shelves, return the maximum number of books you can pick.

Inputs
```
[1, 2, 1]
```
```
 3
```
Input
```
[0, 1, 2, 2]
```
```
 3
```
Input
```
[1, 2, 3, 2, 2]
```
```
4
```
Explanation
```
Input: books = [1,2,1]
Output: 3
Explanation: We can pick from all 3 shelves.

```
```Input: books = [0,1,2,2]
Output: 3
Explanation: We can pick from shelves [1,2,2].
If we had started at the first shelf, we would only pick from shelves [0,1].

```
```
Example 3:

Input: books = [1,2,3,2,2]
Output: 4
Explanation: We can pick from shelves [2,3,2,2].
If we had started at the first shelf, we would only pick from shelves [1,2].
```

Constraints:

* 1 <= fruits.length <= 10<sup>5<sup>
* 0 <= fruits[i] < fruits.length