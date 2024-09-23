import React, { useState } from "react";
import { Button } from "@repo/ui/button";
import { Textarea } from "@repo/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@repo/ui/toggle-group";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link,
} from "lucide-react";

const ProblemConstraintsEditor = () => {
  const [editorContent, setEditorContent] = useState("");

  const handleFormatting = (type: string) => {
    let formattedText = editorContent;
    const selection = window.getSelection();
    // ! temp fix for typescript error also dont think this is playing any role

    if (!selection) return;

    const selectedText = selection.toString();

    if (selectedText) {
      switch (type) {
        case "bold":
          formattedText = editorContent.replace(
            selectedText,
            `**${selectedText}**`
          );
          break;
        case "italic":
          formattedText = editorContent.replace(
            selectedText,
            `*${selectedText}*`
          );
          break;
        case "underline":
          formattedText = editorContent.replace(
            selectedText,
            `__${selectedText}__`
          );
          break;
        case "h1":
          formattedText = editorContent.replace(
            selectedText,
            `# ${selectedText}`
          );
          break;
        case "h2":
          formattedText = editorContent.replace(
            selectedText,
            `## ${selectedText}`
          );
          break;
        case "h3":
          formattedText = editorContent.replace(
            selectedText,
            `### ${selectedText}`
          );
          break;
        case "unordered-list":
          formattedText = editorContent.replace(
            selectedText,
            `\n- ${selectedText.split("\n").join("\n- ")}`
          );
          break;
        case "ordered-list":
          formattedText = editorContent.replace(
            selectedText,
            `\n1. ${selectedText.split("\n").join("\n1. ")}`
          );
          break;
        case "link":
          const url = prompt("Enter the URL:");
          if (url) {
            formattedText = editorContent.replace(
              selectedText,
              `[${selectedText}](${url})`
            );
          }
          break;
        default:
          break;
      }
      setEditorContent(formattedText);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4 bg-gray-800 rounded-lg">
      <ToggleGroup type="multiple" className="justify-start">
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          onClick={() => handleFormatting("bold")}
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          onClick={() => handleFormatting("italic")}
        >
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          aria-label="Toggle underline"
          onClick={() => handleFormatting("underline")}
        >
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="h1"
          aria-label="Toggle h1"
          onClick={() => handleFormatting("h1")}
        >
          <Heading1 className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="h2"
          aria-label="Toggle h2"
          onClick={() => handleFormatting("h2")}
        >
          <Heading2 className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="h3"
          aria-label="Toggle h3"
          onClick={() => handleFormatting("h3")}
        >
          <Heading3 className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="unordered-list"
          aria-label="Toggle unordered list"
          onClick={() => handleFormatting("unordered-list")}
        >
          <List className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="ordered-list"
          aria-label="Toggle ordered list"
          onClick={() => handleFormatting("ordered-list")}
        >
          <ListOrdered className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="link"
          aria-label="Insert link"
          onClick={() => handleFormatting("link")}
        >
          <Link className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <Textarea
        placeholder="Enter Problem Constraints"
        value={editorContent}
        onChange={(e) => setEditorContent(e.target.value)}
        className="min-h-[200px] bg-gray-700 text-white"
      />
    </div>
  );
};

export default ProblemConstraintsEditor;
