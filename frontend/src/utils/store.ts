import { create } from 'zustand';
import { DiagramData } from './api';

interface EditorState {
  diagramType: 'class' | 'sequence' | 'activity' | 'state' | 'er';
  title: string;
  description: string;
  content: string;
  isGenerating: boolean;
  isSaving: boolean;
  currentDiagramId: string | null;
  setDiagramType: (type: 'class' | 'sequence' | 'activity' | 'state' | 'er') => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setContent: (content: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  setCurrentDiagramId: (id: string | null) => void;
  loadDiagram: (diagram: DiagramData) => void;
  resetEditor: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  diagramType: 'class',
  title: '',
  description: '',
  content: '',
  isGenerating: false,
  isSaving: false,
  currentDiagramId: null,
  setDiagramType: (type) => set({ diagramType: type }),
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setContent: (content) => set({ content }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setCurrentDiagramId: (id) => set({ currentDiagramId: id }),
  loadDiagram: (diagram) => set({
    diagramType: diagram.type,
    title: diagram.title,
    description: diagram.description,
    content: diagram.content,
    currentDiagramId: diagram.id || null,
  }),
  resetEditor: () => set({
    diagramType: 'class',
    title: '',
    description: '',
    content: '',
    currentDiagramId: null,
  }),
}));