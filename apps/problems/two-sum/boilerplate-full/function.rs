use std::fs::read_to_string;
use std::io::{self};
use std::str::Lines;

##USER_CODE_HERE##

fn main() -> io::Result<()> {
  let input = read_to_string("/dev/problems/two-sum/tests/inputs/##INPUT_FILE_INDEX##.txt")?;
  let mut lines = input.lines();
  let num1: i32 = lines.next().unwrap().parse().unwrap();
  let num2: i32 = lines.next().unwrap().parse().unwrap();
  let result = sum(num1, num2);
  println!("{}", result);
  Ok(())
}
