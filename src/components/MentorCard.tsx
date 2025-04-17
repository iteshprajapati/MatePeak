
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Define the MentorProfile type
export interface MentorProfile {
  id: string;
  name: string;
  title: string;
  image: string;
  categories: string[];
  rating: number;
  reviewCount: number;
  price: number;
  bio: string;
}

interface MentorCardProps {
  mentor: MentorProfile;
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  return (
    <div className="mentor-card bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <img
            src={mentor.image}
            alt={mentor.name}
            className="w-12 h-12 rounded-full object-cover border border-gray-200"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{mentor.name}</h3>
            <p className="text-gray-600 text-sm">{mentor.title}</p>
            
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {mentor.categories.slice(0, 4).map((category, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="mt-3 text-sm">
          <span className="text-gray-700 font-medium">Full-time</span>
        </div>
      </div>
      
      <div className="px-4 pb-4 flex justify-end">
        <Link to={`/mentors/${mentor.id}`}>
          <Button variant="outline" className="rounded-full bg-matepeak-dark text-white hover:bg-matepeak-secondary">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MentorCard;
