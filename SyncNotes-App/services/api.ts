import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('EXPO_PUBLIC_API_URL is not defined in environment variables');
}

const api = axios.create({
  baseURL: API_URL,
});

export interface Note {
  id: number;
  title: string;
  subject: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export type CreateNoteDTO = Omit<Note, 'id' | 'created_at' | 'updated_at'>;
export type UpdateNoteDTO = Partial<CreateNoteDTO> & { id: number };

export const notesApi = {
  setup: async () => {
    const response = await api.get('', { params: { action: 'setup' } });
    return response.data;
  },
  
  getNotes: async (): Promise<Note[]> => {
    const response = await api.get('', { params: { action: 'getNotes' } });
    return response.data;
  },
  
  addNote: async (note: CreateNoteDTO) => {
    const response = await api.post('', note, { params: { action: 'addNote' } });
    return response.data;
  },
  
  updateNote: async (note: UpdateNoteDTO) => {
    const response = await api.post('', note, { params: { action: 'updateNote' } });
    return response.data;
  },
  
  deleteNote: async (id: number) => {
    const response = await api.post('', { id }, { params: { action: 'deleteNote' } });
    return response.data;
  },
};

export default api;
