export const LANGUAGE_MAPPING: {
  [key: string]: {
    judge0: number;
    internal: number;
    name: string;
    monaco: string;
  };
} = {
  js: { judge0: 63, internal: 1, name: "Javascript", monaco: "javascript" },
  cpp: { judge0: 54, internal: 2, name: "C++", monaco: "cpp" },
  rs: { judge0: 73, internal: 3, name: "Rust", monaco: "rust" },
  java: { judge0: 62, internal: 4, name: "Java", monaco: "java" },
};
