
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const keywords = [
  "Data Structures",
  "Interview Prep",
  "Career Guidance",
  "Resume Review",
  "Wellness Tips",
  "Study Techniques",
  "Coding Help",
  "Industry Insights",
  "Health Advice",
  "Academic Support"
];

const AnimatedSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % keywords.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/mentors?search=${searchQuery}`);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
      <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
        <Search className="ml-4 text-gray-400" />
        <div className="flex-1 flex items-center">
          <span className="text-gray-700 px-2">Search for</span>
          <span className="text-matepeak-primary font-medium min-w-40 inline-block">
            {keywords[currentKeyword]}
          </span>
        </div>
        <Input
          type="text"
          placeholder="Type here..."
          className="flex-1 border-0 focus-visible:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          className="bg-matepeak-dark hover:bg-matepeak-secondary text-white m-1 py-6"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default AnimatedSearchBar;
