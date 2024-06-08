
use std::io::{self, BufRead};

##USER_CODE_HERE##

fn main() {
  let stdin = io::stdin();
  let mut input = stdin.lock().lines().map(|l| l.unwrap());
  let size_arr: usize = input.next().unwrap().parse().unwrap();
let arr: Vec<i32> = input.take(size_arr).map(|s| s.parse().unwrap()).collect();
  let x: i32 = input.next().unwrap().parse().unwrap();
  let result = binSearch(arr, x);
  println!("{}", result);
}
    