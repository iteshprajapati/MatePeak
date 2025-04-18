
import { MentorProfile } from "@/components/MentorCard";

// Mock mentor data grouped by categories
export const mentors: MentorProfile[] = [
  // Recent Graduates (Seniors)
  {
    id: "1",
    name: "Aisha Patel",
    title: "Senior @ IIT Delhi | Computer Science",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    categories: ["Recent Graduates", "Programming", "Peer Mentoring"],
    rating: 4.9,
    reviewCount: 45,
    price: 499,
    bio: "Final year Computer Science student helping juniors with academics and placement preparation.",
    connectionOptions: ["1:1 Call", "Chat", "Mock Interview"]
  },
  {
    id: "2",
    name: "Raj Kumar",
    title: "Senior @ BITS Pilani | Mechanical",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    categories: ["Recent Graduates", "Engineering", "Project Guidance"],
    rating: 4.7,
    reviewCount: 38,
    price: 399,
    bio: "Helping juniors with project selection and implementation.",
    connectionOptions: ["1:1 Call", "Chat", "Document Review"]
  },

  // Toppers
  {
    id: "3",
    name: "Priya Sharma",
    title: "AIR 5 - GATE CSE | IISc Bangalore",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    categories: ["Toppers", "GATE", "Computer Science"],
    rating: 4.9,
    reviewCount: 156,
    price: 1499,
    bio: "GATE CSE topper helping aspirants with exam preparation strategies.",
    connectionOptions: ["1:1 Call", "Group Session", "Study Material"]
  },
  {
    id: "4",
    name: "Vikram Singh",
    title: "AIR 1 - JEE Advanced | IIT Bombay",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    categories: ["Toppers", "JEE", "Physics"],
    rating: 4.8,
    reviewCount: 203,
    price: 1999,
    bio: "JEE topper sharing proven strategies for cracking competitive exams.",
    connectionOptions: ["1:1 Call", "Group Session", "Mock Tests"]
  },

  // Academic Support
  {
    id: "5",
    name: "Dr. Meera Desai",
    title: "PhD in Mathematics | IISc",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb",
    categories: ["Academic Support", "Mathematics", "Research"],
    rating: 4.9,
    reviewCount: 89,
    price: 1299,
    bio: "Mathematics expert specializing in advanced calculus and numerical methods.",
    connectionOptions: ["1:1 Call", "Doubt Solving", "Assignment Help"]
  },
  {
    id: "6",
    name: "Prof. Arjun Reddy",
    title: "Professor @ BITS Hyderabad",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919",
    categories: ["Academic Support", "Physics", "Engineering"],
    rating: 4.7,
    reviewCount: 167,
    price: 999,
    bio: "Experienced professor helping students master complex physics concepts.",
    connectionOptions: ["1:1 Call", "Group Session", "Notes"]
  },

  // Career Guidance
  {
    id: "7",
    name: "Neha Gupta",
    title: "Career Coach | Ex-Google",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    categories: ["Career Guidance", "Tech", "Interview Prep"],
    rating: 4.9,
    reviewCount: 245,
    price: 2499,
    bio: "Tech industry veteran helping students navigate their career paths.",
    connectionOptions: ["1:1 Call", "Resume Review", "Mock Interview"]
  },
  {
    id: "8",
    name: "Karthik Raman",
    title: "MBA | Career Strategist",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    categories: ["Career Guidance", "MBA", "Consulting"],
    rating: 4.8,
    reviewCount: 178,
    price: 1899,
    bio: "Helping students make informed career decisions and transitions.",
    connectionOptions: ["1:1 Call", "Strategy Session", "Profile Review"]
  },

  // Health & Wellness
  {
    id: "9",
    name: "Dr. Sanya Kapoor",
    title: "Mental Health Counselor | MSc Psychology",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    categories: ["Health", "Mental Wellness", "Stress Management"],
    rating: 4.9,
    reviewCount: 134,
    price: 899,
    bio: "Licensed counselor helping students manage academic stress and anxiety.",
    connectionOptions: ["1:1 Call", "Chat Support", "Group Session"]
  },
  {
    id: "10",
    name: "Rohit Mehta",
    title: "Certified Fitness Trainer | Nutritionist",
    image: "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c",
    categories: ["Health", "Fitness", "Nutrition"],
    rating: 4.7,
    reviewCount: 156,
    price: 799,
    bio: "Helping students maintain a healthy lifestyle during academic years.",
    connectionOptions: ["1:1 Call", "Diet Plan", "Workout Plan"]
  }
];

// Get mentor by ID
export const getMentorById = (id: string): MentorProfile | undefined => {
  return mentors.find(mentor => mentor.id === id);
};

// Filter mentors based on search criteria
export const filterMentors = (
  searchTerm: string = "",
  categories: string[] = [],
  priceRange: number[] = [0, 5000]
): MentorProfile[] => {
  return mentors.filter(mentor => {
    const matchesSearchTerm = searchTerm === "" || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategories = categories.length === 0 || 
      categories.some(category => 
        mentor.categories.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
      );
    
    const matchesPrice = mentor.price >= priceRange[0] && mentor.price <= priceRange[1];
    
    return matchesSearchTerm && matchesCategories && matchesPrice;
  });
};
