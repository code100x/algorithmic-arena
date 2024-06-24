#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>

##USER_CODE_HERE##

int main() {
  std::ifstream file("/dev/problems/book-into shelves/tests/inputs/##INPUT_FILE_INDEX##.txt");
  std::vector<std::string> lines;
  std::string line;
  while (std::getline(file, line)) lines.push_back(line);

  file.close();
  int size_books;
  std::istringstream(lines[0]) >> size_books;
  std::vector<int> books(size_books);
  if(!size_books==0) {
  	std::istringstream iss(lines[1]);
  	for (int i=0; i < size_arr; i++) iss >> arr[i];
  }
  int result = totalBooks(books);
  std::cout << result << std::endl;
  return 0;
}
