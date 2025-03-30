import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Upload, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageDropzone } from './ImageDropzone';
import type { Memory, MemoryFormData } from '../types';

const memorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date_taken: z.string().min(1, "Date is required"),
  location: z.string().optional(),
  image_url: z.string().min(1, "Image is required")
});

interface AddMemoryFormProps {
  memory?: Memory;
  onClose: () => void;
  onSubmit: (data: MemoryFormData) => void;
}

export function AddMemoryForm({ memory, onClose, onSubmit }: AddMemoryFormProps) {
  const [imagePreview, setImagePreview] = useState<string>("");
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<MemoryFormData>({
    resolver: zodResolver(memorySchema),
    defaultValues: memory ? {
      title: memory.title,
      description: memory.description,
      date_taken: memory.date_taken,
      location: memory.location,
      image_url: memory.image_url
    } : undefined
  });

  useEffect(() => {
    if (memory?.image_url) {
      setImagePreview(memory.image_url);
    }
  }, [memory]);

  const handleImageDrop = (imageUrl: string) => {
    setValue('image_url', imageUrl);
    setImagePreview(imageUrl);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagePreview(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-card-foreground">
              {memory ? 'Edit Memory' : 'Add New Memory'}
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <ImageDropzone onImageDrop={handleImageDrop} />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Or paste image URL
                </label>
                <input
                  {...register("image_url")}
                  type="url"
                  onChange={(e) => {
                    register("image_url").onChange(e);
                    handleImageUrlChange(e);
                  }}
                  className="w-full px-4 py-2 bg-input rounded-lg border focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image_url && (
                  <p className="mt-1 text-sm text-destructive">{errors.image_url.message}</p>
                )}
              </div>
            </div>

            {imagePreview && (
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                  onError={() => setImagePreview("")}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Title
              </label>
              <input
                {...register("title")}
                type="text"
                className="w-full px-4 py-2 bg-input rounded-lg border focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Our Special Day"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full px-4 py-2 bg-input rounded-lg border focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Tell us about this memory..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Date Taken
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    {...register("date_taken")}
                    type="date"
                    className="w-full pl-10 pr-4 py-2 bg-input rounded-lg border focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                {errors.date_taken && (
                  <p className="mt-1 text-sm text-destructive">{errors.date_taken.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Location (Optional)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    {...register("location")}
                    type="text"
                    className="w-full pl-10 pr-4 py-2 bg-input rounded-lg border focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Where was this?"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border rounded-lg text-foreground hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>{memory ? 'Update Memory' : 'Add Memory'}</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}