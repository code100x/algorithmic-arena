import random

import sys

curr = 40

def generate_randomized_bitonic_array(n,l,r):
    if n < 1:
        return []
    # Generate a list of unique values from -1e9 to 1e9
    values = random.sample(range(l, r), n)

    # Choose a random peak index
    peak_index = random.randint(0, n - 1)

    # Split the list at the peak index
    increasing_part = values[:peak_index + 1]
    decreasing_part = values[peak_index + 1:]

    # Ensure increasing part is in ascending order
    increasing_part.sort()

    # Ensure decreasing part is in descending order
    decreasing_part.sort(reverse=True)

    return increasing_part + decreasing_part

l = -1e9
l = int(l)
r = 1e9
r = int(r)

for i in range(60):
    filename = f"input/{curr + i}.txt" 
    sys.stdout = open(filename, "w")

    n = random.randint(3, 1e5)
    a = [1]
    while(a == sorted(a) or a == sorted(a, reverse=True)) :
        a = generate_randomized_bitonic_array(n, l, r)

    print(n)
    print(*a)
    
    q = random.randint(1, int(1e5))

    queries = []
    for j in range(q):
        ch = random.randint(1, 5)
        if ch != 1:
            queries.append(random.choice(a))
        else:
            queries.append(random.randint(l, r))
    print(q)
    print(*queries)


