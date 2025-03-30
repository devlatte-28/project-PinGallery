import React from 'react';
import { Heart, PlusCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onAddMemory: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function Header({ onAddMemory, onSearch, searchQuery }: HeaderProps) {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="group">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-8 h-8 text-primary drop-shadow-lg" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Our Memories
              </h1>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center bg-accent/50 rounded-full px-4 py-2 flex-1 max-w-md mx-8">
            <Search className="w-5 h-5 text-muted-foreground mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search memories..."
              className="bg-transparent border-none focus:outline-none w-full text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="hidden sm:block text-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="hidden sm:block text-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              About Us
            </Link>
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddMemory}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <PlusCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Add Memory</span>
            </motion.button>
          </nav>
        </div>
      </div>
    </header>
  );
}