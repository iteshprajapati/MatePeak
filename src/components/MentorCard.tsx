
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
    <div className="mentor-card">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={mentor.image}
            alt={mentor.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-mentor-light"
          />
          <div className="flex-1">
            <h3 className="font-medium text-lg text-gray-900">{mentor.name}</h3>
            <p className="text-gray-600 text-sm">{mentor.title}</p>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
              </div>
              <span className="mx-1.5 text-gray-500 text-sm">•</span>
              <span className="text-sm text-gray-500">{mentor.reviewCount} reviews</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-mentor-primary font-bold">₹{mentor.price}/hr</div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {mentor.categories.map((category, index) => (
            <Badge key={index} variant="outline" className="bg-mentor-light text-mentor-primary border-mentor-light">
              {category}
            </Badge>
          ))}
        </div>
        
        <p className="mt-4 text-gray-600 text-sm line-clamp-2">{mentor.bio}</p>
      </div>
      
      <div className="border-t border-gray-100 px-6 py-4 flex justify-end">
        <Link to={`/mentors/${mentor.id}`}>
          <Button variant="outline" className="mr-2 border-mentor-primary text-mentor-primary hover:bg-mentor-light">
            View Profile
          </Button>
        </Link>
        <Link to={`/book/${mentor.id}`}>
          <Button className="bg-mentor-primary hover:bg-mentor-secondary text-white">
            Book Session
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MentorCard;
