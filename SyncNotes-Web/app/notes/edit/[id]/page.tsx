'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useNotes, useUpdateNote } from '../../../../hooks/useNotes';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditNote({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { data: notes, isLoading: isLoadingNotes } = useNotes();
  const { mutate: updateNote, isPending: isUpdating } = useUpdateNote();
  
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
  });

  const note = notes?.find((n) => n.id === Number(id));

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        subject: note.subject,
        description: note.description,
      });
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.subject || !formData.description) {
      alert('Please fill all fields');
      return;
    }

    updateNote({ ...formData, id: Number(id) }, {
      onSuccess: () => {
        router.push(`/notes/${id}`);
      },
      onError: (error: any) => {
        alert('Failed to update note: ' + error.message);
      }
    });
  };

  if (isLoadingNotes) {
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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()} 
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Note</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            placeholder="e.g., Mathematics Lecture 1"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            placeholder="e.g., Calculus"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={10}
            className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
            placeholder="Write your notes here..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Updating...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Update Note</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
