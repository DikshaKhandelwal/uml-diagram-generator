import React from "react";
import { useEffect, useRef } from 'react';
import { Paper, Text, Center, Loader } from '@mantine/core';
import { renderDiagram } from '../utils/mermaidConfig';

interface DiagramPreviewProps {
  content: string;
  isGenerating?: boolean;
}

function DiagramPreview({ content, isGenerating = false }: DiagramPreviewProps) {
  const diagramRef = useRef<HTMLDivElement>(null);
  const previewId = 'diagram-preview';

  useEffect(() => {
    if (content && !isGenerating) {
      renderDiagram(previewId, content);
    }
  }, [content, isGenerating]);

  if (isGenerating) {
    return (
      <Paper shadow="sm" p="xl" h={400} withBorder>
        <Center h="100%">
          <div>
            <Loader size="lg" type="dots" />
            <Text ta="center" mt="md" c="dimmed">Generating diagram...</Text>
          </div>
        </Center>
      </Paper>
    );
  }

  if (!content) {
    return (
      <Paper shadow="sm" p="xl" h={400} withBorder>
        <Center h="100%">
          <Text c="dimmed" fw={500}>
            Diagram preview will appear here
          </Text>
        </Center>
      </Paper>
    );
  }

  return (
    <Paper shadow="sm" p="xl" withBorder>
      <div 
        id={previewId} 
        ref={diagramRef} 
        style={{ 
          minHeight: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto'
        }}
      />
    </Paper>
  );
}

export default DiagramPreview;