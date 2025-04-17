
import { MentorProfile } from "@/components/MentorCard";

// Mock mentor data
export const mentors: MentorProfile[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    title: "Computer Science Professor | IIT Delhi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    categories: ["Academic Support", "Programming", "Research"],
    rating: 4.9,
    reviewCount: 124,
    price: 1200,
    bio: "PhD in Computer Science with 10+ years of teaching experience. I specialize in algorithms, data structures, and AI. I can help you understand complex concepts and improve your coding skills."
  },
  {
    id: "2",
    name: "Rahul Mehta",
    title: "Senior Product Manager | Amazon",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    categories: ["Career Guidance", "Mock Interviews", "Resume Review"],
    rating: 4.8,
    reviewCount: 86,
    price: 1500,
    bio: "7+ years of experience in product management at top tech companies. I help students prepare for product management interviews and provide career guidance for those looking to enter the tech industry."
  },
  {
    id: "3",
    name: "Neha Gupta",
    title: "Wellness Coach | Certified Nutritionist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    categories: ["Wellness & Fitness", "Nutrition", "Mental Health"],
    rating: 4.7,
    reviewCount: 59,
    price: 800,
    bio: "Certified wellness coach with expertise in nutrition and mental health. I help students develop healthy habits, manage stress, and maintain work-life balance during their college years."
  },
  {
    id: "4",
    name: "Aditya Patel",
    title: "Software Engineer | Google",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    categories: ["Programming", "Mock Interviews", "Career Guidance"],
    rating: 4.9,
    reviewCount: 112,
    price: 1800,
    bio: "Senior Software Engineer at Google with experience in helping students crack coding interviews. I provide personalized guidance on DSA, system design, and interview preparation."
  },
  {
    id: "5",
    name: "Meera Desai",
    title: "Marketing Executive | Startup Mentor",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb",
    categories: ["Marketing", "Entrepreneurship", "Career Guidance"],
    rating: 4.6,
    reviewCount: 43,
    price: 1000,
    bio: "Marketing professional with experience in startups and large corporations. I help students understand the marketing landscape and provide guidance on building a career in this field."
  },
  {
    id: "6",
    name: "Dr. Arjun Singh",
    title: "Research Scientist | IISc Bangalore",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919",
    categories: ["Academic Support", "Research", "Higher Education"],
    rating: 4.8,
    reviewCount: 75,
    price: 1400,
    bio: "Experienced researcher and academic mentor specializing in guiding students through research projects, thesis writing, and higher education applications. I can help you improve your research methodologies and academic writing."
  },
  {
    id: "7",
    name: "Sanya Kapoor",
    title: "UX Designer | Microsoft",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    categories: ["Design", "Portfolio Review", "Career Guidance"],
    rating: 4.7,
    reviewCount: 62,
    price: 1200,
    bio: "Senior UX Designer with experience in mentoring design students. I provide feedback on portfolios, help with design projects, and guide students looking to build a career in UX/UI design."
  },
  {
    id: "8",
    name: "Vikram Choudhary",
    title: "Finance Professional | Investment Banking",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    categories: ["Finance", "Career Guidance", "Mock Interviews"],
    rating: 4.9,
    reviewCount: 48,
    price: 1600,
    bio: "Finance professional with experience in investment banking. I help students understand finance concepts, prepare for interviews in the finance sector, and guide them on career paths in finance."
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
