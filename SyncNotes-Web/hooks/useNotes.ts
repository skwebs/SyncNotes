import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notesApi } from '../services/api';
import { CreateNoteDTO, UpdateNoteDTO } from '../types';

export const useNotes = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: notesApi.getNotes,
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newNote: CreateNoteDTO) => notesApi.addNote(newNote),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (note: UpdateNoteDTO) => notesApi.updateNote(note),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => notesApi.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useSetupProject = () => {
  return useMutation({
    mutationFn: notesApi.setup,
  });
};
