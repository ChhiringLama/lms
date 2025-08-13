import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function RichTextEditor({ input, setInput, formField }) {
  const handleChange = (content) => {
    setInput({ ...input, [formField]: content });
  };

  return (
    <ReactQuill
      theme="snow"
      value={input[formField]}
      onChange={handleChange}
    />
  );
}

export default RichTextEditor;
