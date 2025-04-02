import React from 'react';
import { Group, Button, Select, TextInput, Tooltip } from '@mantine/core';
import { IconDeviceFloppy, IconDownload, IconRefresh, IconWand } from '@tabler/icons-react';
import { useEditorStore } from '../utils/store';
import { getDiagramSvg } from '../utils/mermaidConfig';

interface EditorToolbarProps {
  onGenerate: () => void;
  onSave: () => void;
}

function EditorToolbar({ onGenerate, onSave }: EditorToolbarProps) {
  const {
    diagramType,
    title,
    setTitle,
    setDiagramType,
    content,
    isGenerating,
    isSaving,
    resetEditor,
  } = useEditorStore();

  const handleExport = async () => {
    if (!content) return;

    try {
      const svg = await getDiagramSvg(content);
      
      // Create a blob from the SVG
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      // Create a download link and trigger it
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title || 'diagram'}.svg`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting diagram:', error);
    }
  };

  return (
    <Group justify="space-between">
      <Group>
        <TextInput
          placeholder="Untitled Diagram"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          w={200}
        />
        
        <Select
          value={diagramType}
          onChange={(value) => setDiagramType(value as 'class' | 'sequence' | 'activity' | 'state' | 'er')}
          data={[
            { value: 'class', label: 'Class Diagram' },
            { value: 'sequence', label: 'Sequence Diagram' },
            { value: 'activity', label: 'Activity Diagram' },
            { value: 'state', label: 'State Diagram' },
            { value: 'er', label: 'ER Diagram' },
          ]}
          w={180}
        />
      </Group>
      
      <Group>
        <Tooltip label="Reset editor">
          <Button
            variant="light"
            color="gray"
            onClick={resetEditor}
            leftSection={<IconRefresh size={16} />}
          >
            Reset
          </Button>
        </Tooltip>
        
        <Tooltip label="Generate from description">
          <Button
            onClick={onGenerate}
            loading={isGenerating}
            leftSection={<IconWand size={16} />}
            variant="light"
          >
            Generate
          </Button>
        </Tooltip>
        
        <Tooltip label="Export as SVG">
          <Button
            onClick={handleExport}
            disabled={!content}
            leftSection={<IconDownload size={16} />}
            variant="light"
            color="blue"
          >
            Export
          </Button>
        </Tooltip>
        
        <Button
          onClick={onSave}
          loading={isSaving}
          leftSection={<IconDeviceFloppy size={16} />}
          disabled={!content || !title}
        >
          Save
        </Button>
      </Group>
    </Group>
  );
}

export default EditorToolbar;