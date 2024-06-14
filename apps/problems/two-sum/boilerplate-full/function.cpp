#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>

##USER_CODE_HERE##

int main() {
  std::ifstream file("/dev/problems/two-sum/tests/inputs/##INPUT_FILE_INDEX##.txt");
  std::vector<std::string> lines;
  std::string line;
  while (std::getline(file, line)) lines.push_back(line);

  file.close();
  int num1;
  std::istringstream(lines[0]) >> num1;
  int num2;
  std::istringstream(lines[1]) >> num2;
  int result = sum(num1, num2);
  std::cout << result << std::endl;
  return 0;
}
