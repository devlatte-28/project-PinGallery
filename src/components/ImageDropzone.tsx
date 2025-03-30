import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface ImageDropzoneProps {
  onImageDrop: (imageUrl: string) => void;
}

export function ImageDropzone({ onImageDrop }: ImageDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageDrop(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <Upload className="w-12 h-12 text-muted-foreground" />
        {isDragActive ? (
          <p className="text-primary">Drop your image here...</p>
        ) : (
          <>
            <p className="text-muted-foreground">
              Drag & drop an image here, or click to select
            </p>
            <p className="text-sm text-muted-foreground">
              Supports: JPG, PNG, GIF
            </p>
          </>
        )}
      </div>
    </div>
  );
}