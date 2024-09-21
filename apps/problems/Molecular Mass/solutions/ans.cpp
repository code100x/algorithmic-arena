#include <iostream>
#include <stack>
#include <map>
#include <string>

using namespace std;

int main() {
    map<char, int> molecules = {{'H', 1}, {'O', 16}, {'C', 12}};
    string formula;
    cin >> formula;

    stack<int> mass;

    for (int i = 0; i < formula.size(); i++) {
        char e = formula[i];

        if (isdigit(e)) {
            // Multiply the last element on the stack by the digit
            int m = mass.top(); 
            mass.pop();
            mass.push(m * (e - '0'));
        } 
        else if (e == '(') {
            // Push -1 to represent an open parenthesis
            mass.push(-1);
        } 
        else if (e == ')') {
            // Calculate mass for the entire parenthesis block
            int m = 0;
            while (mass.top() != -1) { // -1 represents '('
                m += mass.top();
                mass.pop();
            }
            mass.pop(); // Pop the '(' (-1)
            mass.push(m); // Push the total mass for the block
        } 
        else {
            // It's a molecule, push its mass
            mass.push(molecules[e]);
        }
    }

    // Now sum up all the values in the stack
    int total_mass = 0;
    while (!mass.empty()) {
        total_mass += mass.top();
        mass.pop();
    }

    cout << total_mass << endl;

    return 0;
}
