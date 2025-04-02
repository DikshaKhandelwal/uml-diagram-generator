import React from 'react';
import { Title, Text, SimpleGrid, Card, Button, Group, rem, Stack, Container } from '@mantine/core';
import { IconArrowRight, IconChartArea, IconCode, IconDeviceFloppy } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'AI-Powered Generation',
      description: 'Generate UML diagrams from text descriptions using advanced AI',
      icon: IconChartArea,
      color: 'blue',
    },
    {
      title: 'Code Editor',
      description: 'Edit and customize Mermaid syntax with live preview',
      icon: IconCode,
      color: 'indigo',
    },
    {
      title: 'Save & Export',
      description: 'Save your diagrams for later and export as SVG',
      icon: IconDeviceFloppy,
      color: 'violet',
    }
  ];

  return (
    <Stack gap="xl">
      <Container size="md" py="xl">
        <Stack align="center" gap="lg" my={rem(32)}>
          <Title ta="center" size={48} lh={1.1} fw={900}>
            Create UML Diagrams<br />with <Text span c="indigo" inherit>Natural Language</Text>
          </Title>
          
          <Text size="xl" ta="center" maw={600} mx="auto" c="dimmed">
            Transform text descriptions into professional UML diagrams with our 
            AI-powered tool. Perfect for software developers, architects, and students.
          </Text>
          
          <Group>
            <Button 
              size="lg"
              rightSection={<IconArrowRight size={16} />}
              onClick={() => navigate('/editor')}
            >
              Start Creating
            </Button>
            <Button 
              variant="light" 
              size="lg"
              onClick={() => navigate('/diagrams')}
            >
              View Examples
            </Button>
          </Group>
        </Stack>
      </Container>
      
      <Title ta="center" order={2} mb="md">Features</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {features.map((feature) => (
          <Card key={feature.title} padding="xl" radius="md" withBorder>
            <feature.icon 
              size={rem(50)} 
              style={{ color: `var(--mantine-color-${feature.color}-6)` }} 
              stroke={1.5} 
            />
            <Text size="lg" fw={500} mt="md">{feature.title}</Text>
            <Text size="sm" c="dimmed" mt="sm">
              {feature.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
      
      <Container size="md" my="xl">
        <Stack gap="xl" align="center">
          <Title order={2} ta="center">How It Works</Title>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text ta="center" fw={700} size="lg" mb="md">1. Describe</Text>
              <Text ta="center" c="dimmed">
                Describe the diagram you want to create using natural language.
              </Text>
            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text ta="center" fw={700} size="lg" mb="md">2. Generate</Text>
              <Text ta="center" c="dimmed">
                Our AI converts your description into a UML diagram.
              </Text>
            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text ta="center" fw={700} size="lg" mb="md">3. Customize</Text>
              <Text ta="center" c="dimmed">
                Edit the generated diagram to match your exact needs.
              </Text>
            </Card>
          </SimpleGrid>
          
          <Button 
            size="lg"
            mt="xl"
            onClick={() => navigate('/editor')}
          >
            Create Your First Diagram
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
}

export default HomePage;