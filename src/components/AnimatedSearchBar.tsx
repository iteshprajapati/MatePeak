
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const AnimatedSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/mentors?search=${searchQuery}`);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
      <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
        <Search className="ml-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Type here to search..."
          className="flex-1 border-0 focus-visible:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          className="bg-matepeak-dark hover:bg-matepeak-secondary text-white py-5 px-6 m-1"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default AnimatedSearchBar;
