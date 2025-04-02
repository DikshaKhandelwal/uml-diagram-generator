import React from "react";
import { Textarea, Paper } from '@mantine/core';
import { useEditorStore } from '../utils/store';

function CodeEditor() {
  const { content, setContent } = useEditorStore();

  return (
    <Paper shadow="sm" withBorder>
      <Textarea
        placeholder="Enter your Mermaid diagram code here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        minRows={15}
        maxRows={25}
        autosize
        styles={{
          input: {
            fontFamily: 'monospace',
            fontSize: '14px',
            padding: '16px',
            minHeight: '400px',
          },
        }}
      />
    </Paper>
  );
}

export default CodeEditor;