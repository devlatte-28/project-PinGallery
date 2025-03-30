export interface Memory {
  id: string;
  created_at: string;
  title: string;
  description: string;
  image_url: string;
  date_taken: string;
  location?: string;
  user_id: string;
}

export interface Profile {
  id: string;
  name: string;
  avatar_url: string;
  bio: string;
}

export interface MemoryFormData {
  title: string;
  description: string;
  image_url: string;
  date_taken: string;
  location?: string;
}