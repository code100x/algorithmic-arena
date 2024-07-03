import fs from "fs";
import path from "path";
import { ProblemDefinitionParser } from "./ProblemDefinitionGenerator";
import { FullProblemDefinitionParser } from "./FullProblemDefinitionGenerator";
import dotenv from 'dotenv'
dotenv.config()

function generatePartialBoilerplate(generatorFilePath: string) {
  const inputFilePath = path.join(generatorFilePath, "Structure.md");
  const boilerplatePath = path.join(
    generatorFilePath,
    "boilerplate",
  );

  // Read the input file
  const input = fs.readFileSync(inputFilePath, "utf-8");

  // Parse the input
  const parser = new ProblemDefinitionParser();
  parser.parse(input);

  // Generate the boilerplate code
  const cppCode = parser.generateCpp();
  const jsCode = parser.generateJs();
  const rustCode = parser.generateRust();
  const javaCode = parser.generateJava();

  // Ensure the boilerplate directory exists
  if (!fs.existsSync(boilerplatePath)) {
    fs.mkdirSync(boilerplatePath, { recursive: true });
  }

  // Write the boilerplate code to respective files
  fs.writeFileSync(path.join(boilerplatePath, "function.cpp"), cppCode);
  fs.writeFileSync(path.join(boilerplatePath, "function.js"), jsCode);
  fs.writeFileSync(path.join(boilerplatePath, "function.rs"), rustCode);
  fs.writeFileSync(path.join(boilerplatePath, "function.java"), javaCode);

  console.log("Boilerplate code generated successfully!");
}

function generateFullBoilerPLate(generatorFilePath: string) {
  const inputFilePath = path.join(generatorFilePath, "Structure.md");
  const boilerplatePath = path.join(
    generatorFilePath,
    "boilerplate-full",
  );

  // Read the input file
  const input = fs.readFileSync(inputFilePath, "utf-8");

  // Parse the input
  const parser = new FullProblemDefinitionParser();
  parser.parse(input);

  // Generate the boilerplate code
  const cppCode = parser.generateCpp();
  const jsCode = parser.generateJs();
  const rustCode = parser.generateRust();
  const javaCode = parser.generateJava();

  // Ensure the boilerplate directory exists
  if (!fs.existsSync(boilerplatePath)) {
    fs.mkdirSync(boilerplatePath, { recursive: true });
  }

  // Write the boilerplate code to respective files
  fs.writeFileSync(path.join(boilerplatePath, "function.cpp"), cppCode);
  fs.writeFileSync(path.join(boilerplatePath, "function.js"), jsCode);
  fs.writeFileSync(path.join(boilerplatePath, "function.rs"), rustCode);
  fs.writeFileSync(path.join(boilerplatePath, "function.java"), javaCode);

  console.log("Boilerplate code generated successfully!");
}

const getFolders = (dir: string) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        return reject(err);
      }

      const folders: string[] = [];
      let pending = files.length;

      if (!pending) return resolve(folders);

      files.forEach(file => {
        const filePath = path.join(dir, file);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            return reject(err);
          }

          if (stats.isDirectory()) {
            folders.push(file);
          }

          if (!--pending) {
            resolve(folders);
          }
        });
      });
    });
  });
};
function main() {
  fs.readdir(process.env.PROBLEMS_DIR_PATH || "", (err, files) => {
    files.forEach(file => {
      if (file)
        generatePartialBoilerplate(path.join(process.env.PROBLEMS_DIR_PATH || "", file));
      generateFullBoilerPLate(path.join(process.env.PROBLEMS_DIR_PATH || "", file));
    })
  })
}
if (!process.env.PROBLEMS_DIR_PATH) {
  console.log("Store a valid problems dir path in .env", process.env.PROBLEMS_DIR_PATH);
} else {
  getFolders(process.env.PROBLEMS_DIR_PATH).then((folders: any) => {
    folders.forEach((folder: string) => {
      generatePartialBoilerplate(path.join(process.env.PROBLEMS_DIR_PATH || "", folder));
      generateFullBoilerPLate(path.join(process.env.PROBLEMS_DIR_PATH || "", folder));
    });
  })
}
