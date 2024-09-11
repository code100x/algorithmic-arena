import random
import sys

curr = 111

def gen_array(n , l , r):
    return [random.randint(l, r) for _ in range(n)]


for i in range(10):
    filename = f"input/{curr + i}.txt"
    sys.stdout = open(filename, "w")

    n = random.randint(1, 2 * 10**5)

    print(n)    
    print(*gen_array(n, -10**9, -1))