
# Problem: MMASS - Mass of Molecule

## Problem Description
A molecule can be defined as a sequence of atoms and represented by a chemical formula consisting of letters denoting these atoms. For example, the letter `H` denotes an atom of hydrogen, `C` denotes an atom of carbon, and `O` denotes an atom of oxygen. The formula `COOH` represents a molecule consisting of one atom of carbon, two atoms of oxygen, and one atom of hydrogen.

To write some formulas efficiently, we use the following rules:
1. Letters denoting atoms can be grouped by enclosing them in parentheses. For example, the formula `CH(OH)` contains the group `OH`.
2. Groups can be nested—i.e., a group can also contain other groups.
3. Consecutive occurrences of the same letter can be replaced with that letter followed by the number of those occurrences. For example, the formula `COOHHH` can be written as `CO2H3`, representing a molecule consisting of one atom of carbon, two atoms of oxygen, and three atoms of hydrogen.
4. Consecutive occurrences of the same group can be replaced with that group followed by a number of these occurrences. For example, the formula `CH(CO2H) (CO2H) (CO2H)` can be written as `CH(CO2H)3`, representing a molecule consisting of four atoms of carbon, four atoms of hydrogen, and six atoms of oxygen.
5. A number written after a letter or a group is always between 2 and 9 (inclusive).

The mass of a molecule is the sum of the masses of all its atoms:
- Hydrogen (`H`): mass = 1
- Carbon (`C`): mass = 12
- Oxygen (`O`): mass = 16

Your task is to write a program that calculates the mass of a molecule.

## Input
- The first and only argument is a string containing the formula of the molecule.
- The formula consists of characters `H`, `C`, `O`, `(`, `)`, and digits `2` through `9` only.
- The formula length is less than or equal to 100 characters.

## Output
- Return the mass of the complete Molecular Formula

## Sample Input and Output

### Sample 1
**Input**:
```
COOH
```

**Output**:
```
45
```

NOTE : C(O)2H , CO2H , CHO2 , OCOH will also yield the same result.

### Sample 2
**Input**:
```
CH(CO2H)3
```

**Output**:
```
148
```

### Sample 3
**Input**:
```
((CH)2(OH2H)(C(H))O)3
```

**Output**:
```
222
```

## Constraints
- Length of formula ≤ 100 characters.
- Resulting mass will always be ≤ 100,000.
