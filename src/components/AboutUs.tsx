import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, X } from 'lucide-react';

export function AboutUs() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const coupleInfo = {
    him: {
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
    },
    her: {
      name: "Jane Smith",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
    },
    story: "Our love story began in the heart of the city, where fate brought us together on a rainy afternoon. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  };

  const downloadImage = (imageUrl: string, name: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${name.toLowerCase()}-photo.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Story
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* His Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm p-6">
              <img
                src={coupleInfo.him.image}
                alt={coupleInfo.him.name}
                className="w-full h-80 object-cover rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedImage(coupleInfo.him.image)}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-8 right-8 bg-white/90 p-2 rounded-full shadow-lg"
                onClick={() => downloadImage(coupleInfo.him.image, coupleInfo.him.name)}
              >
                <Download className="w-5 h-5 text-gray-700" />
              </motion.button>
              <h2 className="text-2xl font-semibold mt-4 text-gray-800">{coupleInfo.him.name}</h2>
              <p className="mt-2 text-gray-600">{coupleInfo.him.description}</p>
            </div>
          </motion.div>

          {/* Her Profile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm p-6">
              <img
                src={coupleInfo.her.image}
                alt={coupleInfo.her.name}
                className="w-full h-80 object-cover rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedImage(coupleInfo.her.image)}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-8 right-8 bg-white/90 p-2 rounded-full shadow-lg"
                onClick={() => downloadImage(coupleInfo.her.image, coupleInfo.her.name)}
              >
                <Download className="w-5 h-5 text-gray-700" />
              </motion.button>
              <h2 className="text-2xl font-semibold mt-4 text-gray-800">{coupleInfo.her.name}</h2>
              <p className="mt-2 text-gray-600">{coupleInfo.her.description}</p>
            </div>
          </motion.div>
        </div>

        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            {coupleInfo.story}
          </p>
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.button
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </motion.button>
          <motion.img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </div>
  );
}