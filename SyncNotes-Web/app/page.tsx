'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useNotes, useSetupProject } from '../hooks/useNotes';
import { Plus, Search, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: notes, isLoading, isError, refetch, isRefetching } = useNotes();
  const { mutate: setupProject, isPending: isSettingUp } = useSetupProject();

  const handleSetup = () => {
    if (confirm('This will initialize the Google Sheets database. Continue?')) {
      setupProject(undefined, {
        onSuccess: (data) => {
          alert(data.message || 'Project setup completed!');
          refetch();
        },
        onError: (error: any) => {
          alert('Failed to setup project: ' + error.message);
        }
      });
    }
  };

  const filteredNotes = notes?.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading || isSettingUp) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
        <p className="text-gray-600 text-lg font-medium">
          {isSettingUp ? 'Initializing Database...' : 'Loading Notes...'}
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Failed to load notes</h2>
        <p className="text-gray-600 mb-6">There was an error connecting to the server.</p>
        <div className="flex gap-4">
          <button 
            onClick={() => refetch()} 
            className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Retry
          </button>
          <button 
            onClick={handleSetup} 
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Run Initial Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sync Notes</h1>
          <p className="text-gray-500">Your notes, synced with Google Sheets</p>
        </div>
        <div className="flex items-center gap-2">
           <button 
            onClick={() => refetch()} 
            className={clsx(
              "p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all",
              isRefetching && "animate-spin text-orange-600"
            )}
            title="Refresh"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
          <Link 
            href="/notes/add" 
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-shadow shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add Note</span>
          </Link>
        </div>
      </header>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent sm:text-sm transition-all shadow-sm"
          placeholder="Search by title or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredNotes && filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <Link 
              key={note.id}
              href={`/notes/${note.id}`}
              className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">{note.title}</h2>
              <span className="inline-block px-2 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded mb-3 uppercase tracking-wider">
                {note.subject}
              </span>
              <p className="text-gray-600 text-sm line-clamp-2">
                {note.description}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                <span>Updated {new Date(note.updated_at).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg mb-6">
            {searchQuery ? 'No matching notes found.' : 'No notes found.'}
          </p>
          {searchQuery ? (
            <button 
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Clear Search
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <Link 
                href="/notes/add" 
                className="px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Add Your First Note
              </Link>
              <button 
                onClick={handleSetup}
                className="text-gray-400 hover:text-gray-600 text-sm underline transition-colors"
              >
                Initialize Database
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
