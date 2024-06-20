## Problem: Balanced Arrays

### Description

Given an array of integers, you are allowed to remove at most one element. After potentially removing one element, determine the maximum sum of elements where the sum of the elements on the left of a certain index is equal to the sum of the elements on the right of that index. If no such equilibrium can be achieved, even after a removal, return -1.

### Constraints
- The array `arr` consists of integers.
- The size of `arr` is in the range `[3, 10^5]`.
- Each element in the array is in the range `[1, 10^9]`.

### Output
- Return the maximum sum of the array (excluding the removed element if any) where an equilibrium index exists after potentially removing one element. If no such equilibrium can be found, return `-1`.


### Test Case 1
**Input:**
```
[6, 1, 6, 3]
```
**Explanation:**
Without removing any elements, no equilibrium index exists. By removing the last element `3`, the array becomes `[6, 1, 6]`. We can achieve an equilibrium at index `1` (zero-based index), with `6` on both sides. The sum on either side is `6`.

The other valid partitions (just the partition not the paritions with the sum equal) of `[6,1,6,3]` are :
- `[]` and `[1,6,3]`
- `[6]` and `[6,3]`
- `[6,1]` and `[3]`
- `[6,1,6]` and `[]`


**Output:**
```
6
```

### Test Case 2
**Input:**
```
[3, 3, 5, 3, 3]
```
**Explanation:**
Without removing any elements, the array has an equilibrium index at `2` (zero-based index), with `[3, 3]` on the left and `[3, 3]` on the right, both summing to `6`. No need to remove any elements as this already provides a valid equilibrium.

**Output:**
```
6
```

### Test Case 3
**Input:**
```
[2, 1, 1, 2]
```
**Explanation:**
This array needs the removal of either of the 1's both give the same answer. 
After removing the first 1 the array becomes `[2,1,2]`
Then we can partition it using the `1` at the `1st` index
The sums of the parts `[2]` on the left and `[2]` on the right (excluding the middle `1`) are both equal to `2`.

**Output:**
```
2
```

### Test Case 4
**Input:**
```
[10, 20, 10, 5, 15, 5, 10]
```
**Explanation:**
Removing the element `5` at index `3` results in the array `[10, 20, 10, 15, 5, 10]`. No equilibrium can be found in this modified array that yields a sum larger than any other configuration. Without any removal, equilibrium occurs with the index `2`, but the sum to each side (excluding index `2`) doesn't exceed `30` from other possible configurations.

**Output:**
```
30
```

### Test Case 5
**Input:**
```
[1, 2, 3]
```
**Explanation:**
There's no possible way to remove an element and achieve equilibrium in this array. With or without removal, no index meets the requirement where both sides are equal.

**Output:**
```
-1
```

### Note
- If there is no solution you have to return `-1` else you will get a Wrong Answer Verdict  
- The sum of an empty parition `[]` is considered to be `0` 
- The solution should aim to operate in a time complexity that allows for efficient processing, ideally better than `O(n^2)`, considering potential array sizes.


