import random
import sys
import string
curr = 2

def gen_array(n , l , r):
    return [random.randint(l, r) for _ in range(n)]

def gen_string(n):
    return ''.join(random.choice(string.ascii_lowercase) for _ in range(n))

for i in range(78):
    filename = f"input/{curr + i}.txt"
    sys.stdout = open(filename, "w")

    n = random.randint(1, 50)

    print(gen_string(n))


    