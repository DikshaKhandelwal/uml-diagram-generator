import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Stack, Tabs, Group, Text, Alert } from '@mantine/core';
import { IconMessage, IconCode, IconInfoCircle } from '@tabler/icons-react';
import { useEditorStore } from '../utils/store';
import { 
  generateDiagram, 
  saveDiagram, 
  getDiagram, 
  updateDiagram 
} from '../utils/api';
import { initializeMermaid, getDiagramTemplate } from '../utils/mermaidConfig';

import EditorToolbar from '../components/EditorToolbar';
import DiagramPreview from '../components/DiagramPreview';
import CodeEditor from '../components/CodeEditor';
import DescriptionInput from '../components/DescriptionInput';

function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('description');
  
  const { 
    diagramType, 
    title, 
    description, 
    content,
    setContent,
    isGenerating,
    setIsGenerating,
    isSaving,
    setIsSaving,
    setTitle,
    setCurrentDiagramId,
    loadDiagram,
    resetEditor
  } = useEditorStore();
  
  useEffect(() => {
    initializeMermaid();
    
    if (id) {
      // Load existing diagram
      const fetchDiagram = async () => {
        try {
          const diagram = await getDiagram(id);
          loadDiagram(diagram);
        } catch (error) {
          console.error('Error loading diagram:', error);
          setError('Failed to load diagram');
        }
      };
      
      fetchDiagram();
    } else {
      // New diagram - set template content
      setContent(getDiagramTemplate(diagramType));
    }
  }, [id]);
  
  // Update template when diagram type changes (only for new diagrams)
  useEffect(() => {
    if (!id && !content) {
      setContent(getDiagramTemplate(diagramType));
    }
  }, [diagramType]);
  
  const handleGenerate = async () => {
    if (!description) {
      setError('Please provide a description of your diagram');
      return;
    }
    
    setError(null);
    setIsGenerating(true);
    
    try {
      const generatedContent = await generateDiagram(description, diagramType);
      setContent(generatedContent);
      setActiveTab('code');
    } catch (error) {
      console.error('Error generating diagram:', error);
      setError('Failed to generate diagram. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSave = async () => {
    if (!title) {
      setError('Please provide a title for your diagram');
      return;
    }
    
    if (!content) {
      setError('Diagram content cannot be empty');
      return;
    }
    
    setError(null);
    setIsSaving(true);
    
    try {
      const diagramData = {
        title,
        description,
        content,
        type: diagramType,
      };
      
      if (id) {
        // Update existing diagram
        await updateDiagram(id, diagramData);
      } else {
        // Create new diagram
        const newDiagram = await saveDiagram(diagramData);
        setCurrentDiagramId(newDiagram.id || null);
        navigate(`/editor/${newDiagram.id}`);
      }
    } catch (error) {
      console.error('Error saving diagram:', error);
      setError('Failed to save diagram');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Stack spacing="md">
      <EditorToolbar onGenerate={handleGenerate} onSave={handleSave} />
      
      {error && (
        <Alert icon={<IconInfoCircle size={16} />} color="red" title="Error" withCloseButton onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value as string)}>
        <Tabs.List>
          <Tabs.Tab value="description" leftSection={<IconMessage size={14} />}>
            Description
          </Tabs.Tab>
          <Tabs.Tab value="code" leftSection={<IconCode size={14} />}>
            Code
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="description" pt="xs">
          <Grid mt="md">
            <Grid.Col span={{ base: 12, md: 12 }}>
              <DescriptionInput />
              <Group mt="md" justify="flex-end">
                <Text size="sm" c="dimmed">
                  Describe what you want to generate, then click the "Generate" button
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
        
        <Tabs.Panel value="code" pt="xs">
          <Grid mt="md">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <CodeEditor />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <DiagramPreview content={content} isGenerating={isGenerating} />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}

export default EditorPage;