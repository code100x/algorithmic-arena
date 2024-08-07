import random
import sys

curr = 91

def gen_array_and_print(n, a, b):
    arr = []
    for i in range(n):
        x = random.randint(a, b)
        arr.append(x)

    return arr

for i in range(1):

    filenamee= f"input/{curr+i}.txt"
    sys.stdout = open(filenamee, "w")

    n = 1e5
    n = int(n)
    # a = gen_array_and_print(n, 1, 1e4)
    a = [1] * n

    i = random.randint(0, n-1)

    j = random.randint(i, n-1)

    # sum of subarray[i,j]

    print(n)

    for k in a:
        print(k, end=" ")
    print()

    sum = 0

    for k in range(i, j+1):
        sum += a[k]

    

    b = sum

    print(b)



