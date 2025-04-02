import React from 'react';
import { Group, Title, Button, Container } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconHome, IconCode, IconList } from '@tabler/icons-react';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container size="xl" h="100%">
      <Group h="100%" justify="space-between">
        <Group>
          <Title order={3} c="indigo.7">UML Diagram Generator</Title>
        </Group>
        
        <Group gap="xs">
          <Button
            variant={location.pathname === '/' ? 'filled' : 'light'}
            leftSection={<IconHome size={16} />}
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button
            variant={location.pathname.includes('/editor') ? 'filled' : 'light'}
            leftSection={<IconCode size={16} />}
            onClick={() => navigate('/editor')}
          >
            Editor
          </Button>
          <Button
            variant={location.pathname === '/diagrams' ? 'filled' : 'light'}
            leftSection={<IconList size={16} />}
            onClick={() => navigate('/diagrams')}
          >
            My Diagrams
          </Button>
        </Group>
      </Group>
    </Container>
  );
}

export default Header;