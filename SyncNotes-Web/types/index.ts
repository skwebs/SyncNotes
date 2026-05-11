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

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
