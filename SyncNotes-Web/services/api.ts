import { Note, CreateNoteDTO, UpdateNoteDTO } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

/**
 * Google Apps Script does not support CORS preflight (OPTIONS) requests.
 * To avoid preflight, we must send a "simple request".
 * This means using Content-Type: 'text/plain' for POST requests.
 * GAS will still receive the JSON string in e.postData.contents.
 */
const request = async (action: string, method: 'GET' | 'POST' = 'GET', data?: any) => {
  const url = new URL(API_URL);
  url.searchParams.set('action', action);

  const options: RequestInit = {
    method,
    // Using text/plain avoids CORS preflight
    headers: method === 'POST' ? { 'Content-Type': 'text/plain' } : {},
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url.toString(), options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const notesApi = {
  setup: async () => {
    return request('setup');
  },
  
  getNotes: async (): Promise<Note[]> => {
    return request('getNotes');
  },
  
  addNote: async (note: CreateNoteDTO) => {
    return request('addNote', 'POST', note);
  },
  
  updateNote: async (note: UpdateNoteDTO) => {
    return request('updateNote', 'POST', note);
  },
  
  deleteNote: async (id: number) => {
    return request('deleteNote', 'POST', { id });
  },
};

export default request;
