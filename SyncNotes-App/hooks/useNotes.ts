import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notesApi, Note, CreateNoteDTO, UpdateNoteDTO } from '../services/api';

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
    onMutate: async (newNote) => {
      await queryClient.cancelQueries({ queryKey: ['notes'] });
      const previousNotes = queryClient.getQueryData<Note[]>(['notes']);

      const optimisticNote: Note = {
        ...newNote,
        id: Date.now(), // Temporary ID
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      queryClient.setQueryData<Note[]>(['notes'], (old) => 
        old ? [optimisticNote, ...old] : [optimisticNote]
      );

      return { previousNotes };
    },
    onError: (err, newNote, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(['notes'], context.previousNotes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (note: UpdateNoteDTO) => notesApi.updateNote(note),
    onMutate: async (updatedNote) => {
      await queryClient.cancelQueries({ queryKey: ['notes'] });
      const previousNotes = queryClient.getQueryData<Note[]>(['notes']);

      if (previousNotes) {
        queryClient.setQueryData<Note[]>(
          ['notes'],
          previousNotes.map((note) =>
            note.id === updatedNote.id 
              ? { ...note, ...updatedNote, updated_at: new Date().toISOString() } 
              : note
          )
        );
      }

      return { previousNotes };
    },
    onError: (err, updatedNote, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(['notes'], context.previousNotes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => notesApi.deleteNote(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['notes'] });
      const previousNotes = queryClient.getQueryData<Note[]>(['notes']);

      if (previousNotes) {
        queryClient.setQueryData<Note[]>(
          ['notes'],
          previousNotes.filter((note) => note.id !== id)
        );
      }

      return { previousNotes };
    },
    onError: (err, id, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(['notes'], context.previousNotes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useSetupProject = () => {
  return useMutation({
    mutationFn: notesApi.setup,
  });
};
