export class FullProblemDefinitionParser {
  problemName: string = "";
  functionName: string = "";
  inputFields: { type: string; name: string }[] = [];
  outputFields: { type: string; name: string }[] = [];

  parse(input: string): void {
    const lines = input.split("\n").map((line) => line.trim());
    let currentSection: string | null = null;

    lines.forEach((line) => {
      if (line.startsWith("Problem Name:")) {
        this.problemName = this.extractQuotedValue(line);
      } else if (line.startsWith("Function Name:")) {
        this.functionName = this.extractValue(line);
      } else if (line.startsWith("Input Structure:")) {
        currentSection = "input";
      } else if (line.startsWith("Output Structure:")) {
        currentSection = "output";
      } else if (line.startsWith("Input Field:")) {
        if (currentSection === "input") {
          const field = this.extractField(line);
          if (field) this.inputFields.push(field);
        }
      } else if (line.startsWith("Output Field:")) {
        if (currentSection === "output") {
          const field = this.extractField(line);
          if (field) this.outputFields.push(field);
        }
      }
    });
  }

  extractQuotedValue(line: string): string {
    const match = line.match(/: "(.*)"$/);
    return match ? match[1] : "";
  }

  extractValue(line: string): string {
    const match = line.match(/: (\w+)$/);
    return match ? match[1] : "";
  }

  extractField(line: string): { type: string; name: string } | null {
    const match = line.match(/Field: (\w+(?:<\w+>)?(?:\[\])?(?:\[\])?) (\w+)$/);
    return match ? { type: match[1], name: match[2] } : null;
  }

  generateCpp(): string {
    const inputs = this.inputFields
      .map((field) => `${this.mapTypeToCpp(field.type)} ${field.name}`)
      .join(", ");
    const inputReads = this.inputFields
      .map((field, index) => {
        if (field.type.endsWith("[][]")) {
          return `int rows_${field.name}, cols_${field.name};\n  std::istringstream(lines[${index}]) >> rows_${field.name} >> cols_${field.name};\n  ${this.mapTypeToCpp(field.type)} ${field.name}(rows_${field.name}, std::vector<${this.mapTypeToCpp(field.type.slice(0, -2))}>(cols_${field.name}));\n  for (int i = 0; i < rows_${field.name}; i++) {\n    std::istringstream iss(lines[${index + 1 + i}]);\n    for (int j = 0; j < cols_${field.name}; j++) {\n      iss >> ${field.name}[i][j];\n    }\n  }`;
        } else if (field.type.endsWith("[]") || field.type.startsWith("list<")) {
          return `int size_${field.name};\n  std::istringstream(lines[${index}]) >> size_${field.name};\n  ${this.mapTypeToCpp(field.type)} ${field.name}(size_${field.name});\n  if(size_${field.name} > 0) {\n    std::istringstream iss(lines[${index + 1}]);\n    for (int i = 0; i < size_${field.name}; i++) iss >> ${field.name}[i];\n  }`;
        } else {
          return `${this.mapTypeToCpp(field.type)} ${field.name};\n  std::istringstream(lines[${index}]) >> ${field.name};`;
        }
      })
      .join("\n  ");
    const outputType = this.outputFields[0].type;
    const functionCall = `${outputType} result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;
    const outputWrite = `std::cout << result << std::endl;`;

    return `#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>

##USER_CODE_HERE##

int main() {
  std::ifstream file("/dev/problems/${this.problemName.toLowerCase().replace(" ", "-")}/tests/inputs/##INPUT_FILE_INDEX##.txt");
  std::vector<std::string> lines;
  std::string line;
  while (std::getline(file, line)) lines.push_back(line);

  file.close();
  ${inputReads}
  ${functionCall}
  ${outputWrite}
  return 0;
}
`;
  }

  generateJava(): string {
    let inputReadIndex = 0;
    const inputReads = this.inputFields
    .map((field , index)=>{
      if(field.type.endsWith("[][]")) {
        let javaType = this.mapTypeToJava(field.type.slice(0, -2));
        return `int rows_${field.name} = Integer.parseInt(lines.get(${inputReadIndex++}).trim().split("\\s+")[0]);\n
        int cols_${field.name} = Integer.parseInt(lines.get(${inputReadIndex - 1}).trim().split("\\s+")[1]);\n
        ${this.mapTypeToJava(field.type)} ${field.name} = new ${javaType}[rows_${field.name}][cols_${field.name}];\n
        for (int i = 0; i < rows_${field.name}; i++) {\n
          String[] row = lines.get(${inputReadIndex++}).trim().split("\\s+");\n
          for (int j = 0; j < cols_${field.name}; j++) {\n
            ${field.name}[i][j] = ${this.getJavaParseMethod(javaType)}(row[j]);\n
          }\n
        }\n`;
      } else if(field.type.endsWith("[]") || field.type.startsWith("list<")){
        let javaType = this.mapTypeToJava(field.type);
        let inputType = javaType.match(/<(.*?)>/);
        javaType = inputType ? inputType[1] : 'Integer';
        let parseToType = (javaType === 'Integer') ? 'Int' : javaType;

        return `int size_${field.name} = Integer.parseInt(lines.get(${inputReadIndex++}).trim());\n
        ${this.mapTypeToJava(field.type)} ${field.name} = new ArrayList<>(size_${field.name});\n
        String[] inputStream = lines.get(${inputReadIndex++}).trim().split("\\s+");\n
        for (String inputChar : inputStream)  {\n
          ${field.name}.add(${javaType}.parse${parseToType}(inputChar));\n
        }\n`;
      } else {
        let javaType = this.mapTypeToJava(field.type);
        if(javaType === 'int'){
          javaType = 'Integer';
        }
        else if(javaType === 'float'){
          javaType = 'Float';
        }
        else if(javaType === 'boolean'){
          javaType = 'Boolean';
        }else if(javaType === 'String'){
          javaType = 'String';
        }
        let parseToType = (javaType === 'Integer') ? 'Int' : javaType;
        return `${this.mapTypeToJava(field.type)} ${field.name} = ${javaType}.parse${parseToType}(lines.get(${inputReadIndex++}).trim());`;
      }
    }).join("\n  ");
    const outputType = this.mapTypeToJava(this.outputFields[0].type);
    const functionCall = `${outputType} result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;
    const outputWrite = `System.out.println(result);`;

    return `
import java.io.*;
import java.util.*;

public class Main {
    
    ##USER_CODE_HERE##

    public static void main(String[] args) {
        String filePath = "/dev/problems/${this.problemName.toLowerCase().replace(" ", "-")}/tests/inputs/##INPUT_FILE_INDEX##.txt"; 
        List<String> lines = readLinesFromFile(filePath);
        ${inputReads}
        ${functionCall}
        ${outputWrite}
    }
    public static List<String> readLinesFromFile(String filePath) {
        List<String> lines = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return lines;
    }
}`
  }

  generateJs(): string {
    const inputs = this.inputFields.map((field) => field.name).join(", ");
    const inputReads = this.inputFields
      .map((field) => {
        if (field.type.endsWith("[][]")) {
          return `const [rows_${field.name}, cols_${field.name}] = input.shift().split(' ').map(Number);\nconst ${field.name} = Array.from({length: rows_${field.name}}, () => input.shift().split(' ').map(Number));`;
        } else if (field.type.endsWith("[]") || field.type.startsWith("list<")) {
          return `const size_${field.name} = parseInt(input.shift());\nconst ${field.name} = input.splice(0, size_${field.name}).map(Number);`;
        } else {
          return `const ${field.name} = parseInt(input.shift());`;
        }
      })
      .join("\n  ");
    const outputType = this.outputFields[0].type;
    const functionCall = `const result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;
    const outputWrite = `console.log(result);`;

    return `##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/${this.problemName.toLowerCase().replace(" ", "-")}/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\\n').join(' ').split(' ');
${inputReads}
${functionCall}
${outputWrite}
    `;
  }

  generateRust(): string {
    const inputs = this.inputFields
      .map((field) => `${field.name}: ${this.mapTypeToRust(field.type)}`)
      .join(", ");
    const inputReads = this.inputFields
      .map((field) => {
        if (field.type.endsWith("[][]")) {
          return `let (rows_${field.name}, cols_${field.name}): (usize, usize) = lines.next().and_then(|line| {\n    let mut iter = line.split_whitespace();\n    Some((iter.next()?.parse().ok()?, iter.next()?.parse().ok()?))\n  }).unwrap_or((0, 0));\n  let ${field.name}: ${this.mapTypeToRust(field.type)} = (0..rows_${field.name}).map(|_| {\n    lines.next().unwrap_or_default().split_whitespace().take(cols_${field.name}).filter_map(|x| x.parse().ok()).collect()\n  }).collect();`;
        } else if (field.type.endsWith("[]") || field.type.startsWith("list<")) {
          return `let size_${field.name}: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);\n  let ${field.name}: ${this.mapTypeToRust(field.type)} = lines.next().unwrap_or_default().split_whitespace().take(size_${field.name}).filter_map(|x| x.parse().ok()).collect();`;
        } else {
          return `let ${field.name}: ${this.mapTypeToRust(field.type)} = lines.next().unwrap().parse().unwrap();`;
        }
      })
      .join("\n  ");
    const containsVector = this.inputFields.find((field) =>
      field.type.startsWith("list<")
    );
    const outputType = this.mapTypeToRust(this.outputFields[0].type);
    const functionCall = `let result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;
    const outputWrite = `println!("{}", result);`;

    return `use std::fs::read_to_string;
use std::io::{self};
use std::str::Lines;

##USER_CODE_HERE##

fn main() -> io::Result<()> {
  let input = read_to_string("/dev/problems/${this.problemName.toLowerCase().replace(" ", "-")}/tests/inputs/##INPUT_FILE_INDEX##.txt")?;
  let mut lines = input.lines();
  ${inputReads}
  ${functionCall}
  ${outputWrite}
  Ok(())
}${
  containsVector
    ? `\nfn parse_input(mut input: Lines, size_arr: usize) -> Vec<i32> {
    let arr: Vec<i32> = input
        .next()
        .unwrap_or_default()
        .split_whitespace()
        .filter_map(|x| x.parse().ok())
        .collect();

    if size_arr == 0 {
        Vec::new()
    } else {
        arr
    }
}`
    : ""
}
`;
  }

  mapTypeToCpp(type: string): string {
    switch (type) {
      case "int":
        return "int";
      case "float":
        return "float";
      case "string":
        return "std::string";
      case "bool":
        return "bool";
      case "int[]":
        return "std::vector<int>";
      case "float[]":
        return "std::vector<float>";
      case "string[]":
        return "std::vector<std::string>";
      case "bool[]":
        return "std::vector<bool>";
      case "int[][]":
        return "std::vector<std::vector<int>>";
      case "float[][]":
        return "std::vector<std::vector<float>>";
      case "string[][]":
        return "std::vector<std::vector<std::string>>";
      case "bool[][]":
        return "std::vector<std::vector<bool>>";
      default:
        return "unknown";
    }
  }

  mapTypeToRust(type: string): string {
    switch (type) {
      case "int":
        return "i32";
      case "float":
        return "f64";
      case "string":
        return "String";
      case "bool":
        return "bool";
      case "int[]":
        return "Vec<i32>";
      case "float[]":
        return "Vec<f64>";
      case "string[]":
        return "Vec<String>";
      case "bool[]":
        return "Vec<bool>";
      case "int[][]":
        return "Vec<Vec<i32>>";
      case "float[][]":
        return "Vec<Vec<f64>>";
      case "string[][]":
        return "Vec<Vec<String>>";
      case "bool[][]":
        return "Vec<Vec<bool>>";
      default:
        return "unknown";
    }
  }
  mapTypeToJava(type:string):string {
    switch (type) {
      case "int":
        return "int";
      case "float":
        return "float";
      case "string":
        return "String";
      case "bool":
        return "boolean";
      case "int[]":
        return "int[]";
      case "float[]":
        return "float[]";
      case "string[]":
        return "String[]";
      case "bool[]":
        return "boolean[]";
      case "int[][]":
        return "int[][]";
      case "float[][]":
        return "float[][]";
      case "string[][]":
        return "String[][]";
      case "bool[][]":
        return "boolean[][]";
      default:
        return "unknown";
    }
  }

  getJavaParseMethod(type: string): string {
    switch (type) {
      case "int":
        return "Integer.parseInt";
      case "float":
        return "Float.parseFloat";
      case "boolean":
        return "Boolean.parseBoolean";
      case "String":
        return "";
      default:
        return "unknown";
    }
  }
}
