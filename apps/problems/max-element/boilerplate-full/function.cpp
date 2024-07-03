#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>

##USER_CODE_HERE##

int main() {
  std::ifstream file("/dev/problems/max-element/tests/inputs/##INPUT_FILE_INDEX##.txt");
  std::vector<std::string> lines;
  std::string line;
  while (std::getline(file, line)) lines.push_back(line);

  file.close();
  int size_arr;
  std::istringstream(lines[0]) >> size_arr;
  std::vector<int> arr(size_arr);
  if(!size_arr==0) {
  	std::istringstream iss(lines[1]);
  	for (int i=0; i < size_arr; i++) iss >> arr[i];
  }
  int result = maxElement(arr);
  std::cout << result << std::endl;
  return 0;
}
