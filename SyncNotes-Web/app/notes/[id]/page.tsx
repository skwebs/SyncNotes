'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { useNotes, useDeleteNote } from '../../../hooks/useNotes';
import { ArrowLeft, Edit, Trash2, Loader2, Calendar, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function NoteDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { data: notes, isLoading } = useNotes();
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();

  const note = notes?.find((n) => n.id === Number(id));

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(Number(id), {
        onSuccess: () => {
          router.push('/');
        },
        onError: (error: any) => {
          alert('Failed to delete note: ' + error.message);
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Note not found</h2>
        <Link href="/" className="text-orange-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <Link 
          href="/" 
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center gap-3">
          <Link 
            href={`/notes/edit/${note.id}`}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg font-semibold transition-all"
          >
            <Edit className="w-5 h-5" />
            <span>Edit</span>
          </Link>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
            <span>Delete</span>
          </button>
        </div>
      </header>

      <article className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 text-sm font-bold rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            {note.subject}
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{note.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Created {new Date(note.created_at).toLocaleDateString()}</span>
            </div>
            {note.updated_at !== note.created_at && (
              <div className="flex items-center gap-1.5">
                <span>•</span>
                <span>Updated {new Date(note.updated_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {note.description}
          </p>
        </div>
      </article>
    </div>
  );
}
