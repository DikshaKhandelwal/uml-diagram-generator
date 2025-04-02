import React from 'react';
import { useEffect, useRef } from 'react';
import { Card, Text, Group, Button, Title, Badge } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { renderDiagram } from '../utils/mermaidConfig';
import { DiagramData } from '../utils/api';

interface DiagramCardProps {
  diagram: DiagramData;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function DiagramCard({ diagram, onEdit, onDelete }: DiagramCardProps) {
  const previewId = `diagram-preview-${diagram.id}`;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (diagram.content) {
      renderDiagram(previewId, diagram.content);
    }
  }, [diagram.content, previewId]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'blue';
      case 'sequence': return 'green';
      case 'activity': return 'orange';
      case 'state': return 'purple';
      case 'er': return 'red';
      default: return 'gray';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder ref={cardRef}>
      <Card.Section>
        <div 
          id={previewId} 
          style={{ 
            height: '200px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: '#f9fafb'
          }}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Title order={4}>{diagram.title}</Title>
        <Badge color={getTypeColor(diagram.type)} variant="light">
          {diagram.type.charAt(0).toUpperCase() + diagram.type.slice(1)}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={2} mb="md">
        {diagram.description || 'No description provided'}
      </Text>

      <Text size="xs" c="dimmed" mb="md">
        Last updated: {formatDate(diagram.updatedAt)}
      </Text>

      <Group justify="flex-end">
        <Button 
          variant="light" 
          color="blue" 
          leftSection={<IconEdit size={16} />}
          onClick={() => onEdit(diagram.id || '')}
        >
          Edit
        </Button>
        <Button 
          variant="light" 
          color="red" 
          leftSection={<IconTrash size={16} />}
          onClick={() => onDelete(diagram.id || '')}
        >
          Delete
        </Button>
      </Group>
    </Card>
  );
}

export default DiagramCard;