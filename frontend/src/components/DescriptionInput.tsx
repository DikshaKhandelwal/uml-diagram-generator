import React from 'react';
import { Textarea, Paper, Title } from '@mantine/core';
import { useEditorStore } from '../utils/store';

function DescriptionInput() {
  const { description, setDescription } = useEditorStore();

  return (
    <Paper shadow="sm" p="md" withBorder>
      <Title order={5} mb="xs">Describe your diagram</Title>
      <Textarea
        placeholder="Describe what you want to generate. For example: 'Create a class diagram for an e-commerce system with User, Product, Order, and Payment classes.'"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        minRows={4}
        maxRows={8}
        autosize
      />
    </Paper>
  );
}

export default DescriptionInput;