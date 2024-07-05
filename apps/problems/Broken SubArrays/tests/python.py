import random
import sys

curr = 51

def gen_array_and_print(n, a, b):
    print(n)
    for i in range(n):
        print(random.randint(a, b), end=" ")
    print()


for i in range(40):

    filenamee= f"input/{curr+i}.txt"
    sys.stdout = open(filenamee, "w")

    n = random.randint(1, 1e5)

    gen_array_and_print(n, 1, 1e4)

    b = random.randint(1,1e6)

    print(b)



