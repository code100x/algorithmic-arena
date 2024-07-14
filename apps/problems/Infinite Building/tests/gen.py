import random
import sys

curr = 22

lst = []

i = 3

while i*i < (2* 10**9):
    lst.append(i*i)
    i += 1

for i in range(78):
    filename = f"input/{curr + i}.txt"
    sys.stdout = open(filename, "w")

    n = random.choice(lst) + random.randint(0, int(10**2))

    if n > 10**9:
        n = random.randint(10**9, 2*10**9)

    print(n)

