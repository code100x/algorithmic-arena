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
      .map((field) => {
        if (field.type.startsWith("list<")) {
          return `int size_${field.name};\n  std::cin >> size_${field.name};\n  ${this.mapTypeToCpp(field.type)} ${field.name}(size_${field.name});\n  for(int i = 0; i < size_${field.name}; ++i) std::cin >> ${field.name}[i];`;
        } else {
          return `std::cin >> ${field.name};`;
        }
      })
      .join("\n  ");
    const outputType = this.outputFields[0].type;
    const functionCall = `${outputType} result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;
    const outputWrite = `std::cout << result << std::endl;`;

    return `
#include <iostream>
#include <vector>
#include <string>

##USER_CODE_HERE##

int main() {
  ${inputReads}
  ${functionCall}
  ${outputWrite}
  return 0;
}
    `;
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

    return `
##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\\n').join(' ').split(' ');
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
          return `let size_${field.name}: usize = input.next().unwrap().parse().unwrap();\nlet ${field.name}: ${this.mapTypeToRust(field.type)} = input.take(size_${field.name}).map(|s| s.parse().unwrap()).collect();`;
        } else {
          return `let ${field.name}: ${this.mapTypeToRust(field.type)} = input.next().unwrap().parse().unwrap();`;
        }
      })
      .join("\n  ");
    const outputType = this.mapTypeToRust(this.outputFields[0].type);
    const functionCall = `let result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;
    const outputWrite = `println!("{}", result);`;

    return `
use std::io::{self, BufRead};

##USER_CODE_HERE##

fn main() {
  let stdin = io::stdin();
  let mut input = stdin.lock().lines().map(|l| l.unwrap());
  ${inputReads}
  ${functionCall}
  ${outputWrite}
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
}
