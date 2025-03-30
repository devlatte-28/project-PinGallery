import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { MemoryGrid } from './components/MemoryGrid';
import { AboutUs } from './components/AboutUs';
import { AddMemoryForm } from './components/AddMemoryForm';
import { supabase } from './lib/supabase';
import type { Memory, MemoryFormData } from './types';

function App() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setMemories(data);
      }
    } catch (error) {
      console.error('Error fetching memories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMemories = useMemo(() => {
    if (!searchQuery) return memories;
    
    const query = searchQuery.toLowerCase();
    return memories.filter(memory => 
      memory.title.toLowerCase().includes(query) ||
      memory.description.toLowerCase().includes(query) ||
      memory.location?.toLowerCase().includes(query) ||
      memory.date_taken.includes(query)
    );
  }, [memories, searchQuery]);

  const handleAddMemory = async (newMemory: MemoryFormData) => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .insert([{
          ...newMemory,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setMemories([data, ...memories]);
      }
      setIsAddingMemory(false);
    } catch (error) {
      console.error('Error adding memory:', error);
    }
  };

  const handleUpdateMemory = async (id: string, updatedMemory: MemoryFormData) => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .update(updatedMemory)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setMemories(memories.map(memory => 
          memory.id === id ? data : memory
        ));
      }
      setEditingMemory(null);
    } catch (error) {
      console.error('Error updating memory:', error);
    }
  };

  const handleDeleteMemory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('memories')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setMemories(memories.filter(memory => memory.id !== id));
    } catch (error) {
      console.error('Error deleting memory:', error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-background texture-pattern">
        <Header 
          onAddMemory={() => setIsAddingMemory(true)} 
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={
              <MemoryGrid 
                memories={filteredMemories}
                onEdit={setEditingMemory}
                onDelete={handleDeleteMemory}
                isLoading={isLoading}
              />
            } />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>

        {isAddingMemory && (
          <AddMemoryForm
            onClose={() => setIsAddingMemory(false)}
            onSubmit={handleAddMemory}
          />
        )}

        {editingMemory && (
          <AddMemoryForm
            memory={editingMemory}
            onClose={() => setEditingMemory(null)}
            onSubmit={(data) => handleUpdateMemory(editingMemory.id, data)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;