import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  MapPin,
  Calendar,
  Download,
  X,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import type { Memory } from "../types";

interface MemoryGridProps {
  memories: Memory[];
  onEdit: (memory: Memory) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export function MemoryGrid({
  memories,
  onEdit,
  onDelete,
  isLoading,
}: MemoryGridProps) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  const breakpointColumns = {
    default: 4,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1,
  };

  const downloadImage = (imageUrl: string, title: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id: string) => {
    setShowDeleteConfirm(null);
    onDelete(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading memories...</p>
        </div>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">No memories yet</h3>
          <p className="text-muted-foreground">
            Click the "Add Memory" button to create your first memory.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-8">
        <Masonry
          breakpointCols={breakpointColumns}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {memories.map((memory) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="memory-card">
                <div className="relative group">
                  <img
                    src={memory.image_url}
                    alt={memory.title}
                    className="w-full h-auto object-cover transition-transform duration-500 cursor-pointer rounded-t-xl"
                    onClick={() => setSelectedMemory(memory)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                      <h3 className="font-semibold text-lg mb-1 text-orange-500 dark:text-rose-600 px-2 py-1 rounded-md transition hover:bg-gray-300/30">
                        {memory.title}
                      </h3>{" "}
                      <p className="text-sm opacity-90 line-clamp-2">
                        {memory.description}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-background/90 p-2 rounded-full shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(memory.image_url, memory.title);
                        }}
                      >
                        <Download className="w-5 h-5 text-foreground" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-background/90 p-2 rounded-full shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(memory);
                        }}
                      >
                        <Edit className="w-5 h-5 text-foreground" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-destructive/90 p-2 rounded-full shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(memory.id);
                        }}
                      >
                        <Trash2 className="w-5 h-5 text-destructive-foreground" />
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-card/50 backdrop-blur-sm rounded-b-xl">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {format(new Date(memory.date_taken), "MMMM d, yyyy")}
                      </span>
                    </div>
                    {memory.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate max-w-[150px]">
                          {memory.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>

      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.button
              className="absolute top-4 right-4 text-foreground bg-background/50 p-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedMemory(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedMemory.image_url}
                alt={selectedMemory.title}
                className="w-full max-h-[90vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/80 via-background/50 to-transparent text-foreground rounded-b-lg">
                <h2 className="text-2xl font-semibold mb-2">
                  {selectedMemory.title}
                </h2>
                <p className="text-lg opacity-90">
                  {selectedMemory.description}
                </p>
                <div className="flex items-center mt-2 text-sm opacity-80">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {format(
                      new Date(selectedMemory.date_taken),
                      "MMMM d, yyyy"
                    )}
                  </span>
                  {selectedMemory.location && (
                    <>
                      <MapPin className="w-4 h-4 ml-4 mr-2" />
                      <span>{selectedMemory.location}</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              className="bg-card rounded-lg p-6 max-w-md w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-xl font-semibold mb-4">Delete Memory</h3>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete this memory? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 rounded-lg border hover:bg-accent transition-colors"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
                  onClick={() => handleDelete(showDeleteConfirm)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
