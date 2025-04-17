
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
  // Get first letter of first and last name for avatar fallback
  const nameParts = mentor.name.split(' ');
  const initials = nameParts.length > 1 
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
    : mentor.name[0];

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-200">
      <CardContent className="p-4">
        {/* Top section with name and rating */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-gray-200">
              <AvatarImage src={mentor.image} alt={mentor.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-900">{mentor.name}</h3>
              <p className="text-gray-600 text-sm">{mentor.title}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
          </div>
        </div>
        
        {/* Categories/tags section */}
        <div className="mt-2 flex flex-wrap gap-1 mb-3">
          {mentor.categories.slice(0, 4).map((category, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
              {category}
            </Badge>
          ))}
        </div>
        
        {/* Bio section (replacing Full-time) */}
        <div className="mt-3 text-sm">
          <p className="text-gray-700">{mentor.bio.substring(0, 100)}{mentor.bio.length > 100 ? '...' : ''}</p>
        </div>
        
        {/* View Profile button */}
        <div className="mt-4 flex justify-end">
          <Link to={`/mentors/${mentor.id}`}>
            <Button variant="outline" className="rounded-full bg-matepeak-dark text-white hover:bg-matepeak-secondary">
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorCard;
