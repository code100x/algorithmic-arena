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
    const match = line.match(/Field: (\w+(?:<\w+>)?) (\w+)$/);
    return match ? { type: match[1], name: match[2] } : null;
  }

  generateCpp(): string {
    const inputs = this.inputFields
      .map((field) => `${this.mapTypeToCpp(field.type)} ${field.name}`)
      .join(", ");
    const inputReads = this.inputFields
      .map((field, index) => {
        if (field.type.startsWith("list<")) {
          return `int size_${field.name};\n  std::istringstream(lines[${index}]) >> size_${field.name};\n  ${this.mapTypeToCpp(field.type)} ${field.name}(size_${field.name});\n  if(!size_${field.name}==0) {\n  \tstd::istringstream iss(lines[${index + 1}]);\n  \tfor (int i=0; i < size_arr; i++) iss >> arr[i];\n  }`;
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
      if(field.type.startsWith("list<")){
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
        if (field.type.startsWith("list<")) {
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
        if (field.type.startsWith("list<")) {
          return `let size_${field.name}: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);\n\tlet ${field.name}: ${this.mapTypeToRust(field.type)} = parse_input(lines, size_${field.name});`;
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
      case "list<int>":
        return "std::vector<int>";
      case "list<float>":
        return "std::vector<float>";
      case "list<string>":
        return "std::vector<std::string>";
      case "list<bool>":
        return "std::vector<bool>";
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
      case "list<int>":
        return "Vec<i32>";
      case "list<float>":
        return "Vec<f64>";
      case "list<string>":
        return "Vec<String>";
      case "list<bool>":
        return "Vec<bool>";
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
      case "list<int>":
        return "List<Integer>";
      case "list<float>":
        return "List<Float>";
      case "list<string>":
        return "List<String>";
      case "list<bool>":
        return "List<Boolean>";
      default:
        return "unknown";
    }
  }
}
