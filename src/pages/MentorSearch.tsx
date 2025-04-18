
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import MentorCard from "@/components/MentorCard";
import { filterMentors } from "@/data/mentors";
import { MentorProfile } from "@/components/MentorCard";

const MentorSearch = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "";
  const initialSearchTerm = queryParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMentors, setFilteredMentors] = useState<MentorProfile[]>([]);
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: initialSearchTerm,
    categories: initialCategory ? [initialCategory] : [],
    priceRange: [0, 2000],
  });

  useEffect(() => {
    if (initialSearchTerm) {
      setSearchQuery(initialSearchTerm);
    }
    
    updateFilters({
      searchTerm: initialSearchTerm,
      categories: initialCategory ? [initialCategory] : [],
      priceRange: [0, 2000],
    });
  }, [initialSearchTerm, initialCategory]);

  const updateFilters = (filters: any) => {
    console.log("Updating filters:", filters);
    setSearchFilters(filters);
    
    if (filters.aiResults) {
      console.log("Using AI search results:", filters.aiResults);
      setFilteredMentors(filters.aiResults);
    } else {
      console.log("Using standard filtering with term:", filters.searchTerm);
      const filteredResults = filterMentors(
        filters.searchTerm,
        filters.categories,
        filters.priceRange
      );
      console.log("Standard filter results:", filteredResults);
      setFilteredMentors(filteredResults);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-mentor-light/50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Mentor</h1>
            <p className="text-gray-600 mb-6">
              Browse our curated selection of mentors or use filters to find the perfect match for your needs.
            </p>
            
            <SearchFilters onSearch={updateFilters} />
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {filteredMentors.length} {filteredMentors.length === 1 ? "Mentor" : "Mentors"} Available
            </h2>
            {searchFilters.searchTerm && (
              <div className="text-gray-600">
                Search results for: <span className="font-medium">{searchFilters.searchTerm}</span>
              </div>
            )}
          </div>
          
          {filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No mentors found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search filters or browse all available mentors.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MentorSearch;
