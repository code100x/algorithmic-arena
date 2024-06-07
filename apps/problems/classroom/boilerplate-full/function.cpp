
#include <iostream>
#include <vector>
#include <string>

##USER_CODE_HERE##

int main() {
  int size_arr;
  std::cin >> size_arr;
  std::vector<int> arr(size_arr);
  for(int i = 0; i < size_arr; ++i) std::cin >> arr[i];
  int result = classroom(arr);
  std::cout << result << std::endl;
  return 0;
}
    