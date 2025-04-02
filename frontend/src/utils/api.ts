import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface DiagramData {
  id?: string;
  title: string;
  description: string;
  content: string;
  type: 'class' | 'sequence' | 'activity' | 'state' | 'er';
  createdAt?: string;
  updatedAt?: string;
}

export const generateDiagram = async (prompt: string, type: string): Promise<string> => {
  const response = await api.post('/generate', { prompt, type });
  return response.data.diagram;
};

export const saveDiagram = async (diagramData: DiagramData): Promise<DiagramData> => {
  const response = await api.post('/diagrams', diagramData);
  return response.data;
};

export const updateDiagram = async (id: string, diagramData: Partial<DiagramData>): Promise<DiagramData> => {
  const response = await api.put(`/diagrams/${id}`, diagramData);
  return response.data;
};

export const getDiagram = async (id: string): Promise<DiagramData> => {
  const response = await api.get(`/diagrams/${id}`);
  return response.data;
};

export const getAllDiagrams = async (): Promise<DiagramData[]> => {
  const response = await api.get('/diagrams');
  return response.data;
};

export const deleteDiagram = async (id: string): Promise<void> => {
  await api.delete(`/diagrams/${id}`);
};

export default api;