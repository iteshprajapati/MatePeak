
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, UserCircle, MessageCircle, Search, Star, BookOpen } from "lucide-react";
import { mentors } from "@/data/mentors";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Mock upcoming sessions data
  const upcomingSessions = [
    {
      id: "1",
      mentorId: "4",
      mentorName: "Aditya Patel",
      mentorImage: mentors[3].image,
      date: "2025-04-20",
      time: "10:00 AM",
      duration: 60,
      topic: "Mock Interview: Software Engineering Internship",
      status: "confirmed"
    },
    {
      id: "2",
      mentorId: "1",
      mentorName: "Dr. Priya Sharma",
      mentorImage: mentors[0].image,
      date: "2025-04-25",
      time: "3:00 PM",
      duration: 30,
      topic: "Help with Data Structures Assignment",
      status: "pending"
    }
  ];
  
  // Mock past sessions data
  const pastSessions = [
    {
      id: "3",
      mentorId: "2",
      mentorName: "Rahul Mehta",
      mentorImage: mentors[1].image,
      date: "2025-04-10",
      time: "2:00 PM",
      duration: 60,
      topic: "Resume Review and Career Guidance",
      status: "completed",
      rated: true,
      rating: 5
    },
    {
      id: "4",
      mentorId: "3",
      mentorName: "Neha Gupta",
      mentorImage: mentors[2].image,
      date: "2025-04-05",
      time: "11:00 AM",
      duration: 30,
      topic: "Stress Management During Exam Period",
      status: "completed",
      rated: false
    }
  ];
  
  // Mock recommended mentors (based on user's interests)
  const recommendedMentors = mentors.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-mentor-light/30 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
                <p className="text-gray-600">Welcome back, Aman! Manage your mentoring sessions and track your progress.</p>
              </div>
              <Link to="/mentors">
                <Button className="bg-mentor-primary hover:bg-mentor-secondary text-white">
                  Find New Mentors
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled mentoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-mentor-primary">{upcomingSessions.length}</div>
                  <Calendar className="h-8 w-8 text-mentor-primary opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Completed Sessions</CardTitle>
                <CardDescription>Total sessions you've completed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-mentor-primary">{pastSessions.length}</div>
                  <Clock className="h-8 w-8 text-mentor-primary opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Available Credits</CardTitle>
                <CardDescription>Your account balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-mentor-primary">₹2000</div>
                  <BookOpen className="h-8 w-8 text-mentor-primary opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Your Mentoring Sessions</h2>
            
            <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past Sessions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <img
                              src={session.mentorImage}
                              alt={session.mentorName}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                <h3 className="font-medium text-lg">{session.topic}</h3>
                                <Badge 
                                  variant={session.status === "confirmed" ? "default" : "outline"}
                                  className={session.status === "confirmed" 
                                    ? "bg-green-100 text-green-800 hover:bg-green-100" 
                                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
                                >
                                  {session.status === "confirmed" ? "Confirmed" : "Pending"}
                                </Badge>
                              </div>
                              
                              <p className="text-gray-600">
                                with <Link to={`/mentors/${session.mentorId}`} className="text-mentor-primary hover:underline">{session.mentorName}</Link>
                              </p>
                              
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{new Date(session.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{session.time} ({session.duration} min)</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                              <Button className="bg-mentor-primary hover:bg-mentor-secondary text-white w-full md:w-auto">
                                Join Session
                              </Button>
                              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 w-full md:w-auto">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Upcoming Sessions</h3>
                    <p className="text-gray-600 mb-6">
                      You don't have any upcoming mentoring sessions scheduled.
                    </p>
                    <Link to="/mentors">
                      <Button className="bg-mentor-primary hover:bg-mentor-secondary text-white">
                        Find a Mentor
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past">
                {pastSessions.length > 0 ? (
                  <div className="space-y-4">
                    {pastSessions.map((session) => (
                      <div key={session.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <img
                              src={session.mentorImage}
                              alt={session.mentorName}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                <h3 className="font-medium text-lg">{session.topic}</h3>
                                <Badge 
                                  variant="outline"
                                  className="bg-gray-100 text-gray-800 hover:bg-gray-100"
                                >
                                  Completed
                                </Badge>
                              </div>
                              
                              <p className="text-gray-600">
                                with <Link to={`/mentors/${session.mentorId}`} className="text-mentor-primary hover:underline">{session.mentorName}</Link>
                              </p>
                              
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{new Date(session.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{session.time} ({session.duration} min)</span>
                                </div>
                                {session.rated && (
                                  <div className="flex items-center text-yellow-500">
                                    <Star className="h-4 w-4 mr-1 fill-yellow-500" />
                                    <span>{session.rating}/5</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                              {!session.rated && (
                                <Button className="bg-mentor-primary hover:bg-mentor-secondary text-white w-full md:w-auto">
                                  Rate Session
                                </Button>
                              )}
                              <Button variant="outline" className="border-mentor-primary text-mentor-primary w-full md:w-auto">
                                Book Again
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Past Sessions</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't completed any mentoring sessions yet.
                    </p>
                    <Link to="/mentors">
                      <Button className="bg-mentor-primary hover:bg-mentor-secondary text-white">
                        Find a Mentor
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recommended Mentors For You</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedMentors.map((mentor) => (
                <div key={mentor.id} className="mentor-card">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{mentor.name}</h3>
                        <p className="text-gray-600 text-sm">{mentor.title}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm">{mentor.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.categories.slice(0, 2).map((category, index) => (
                        <Badge key={index} variant="outline" className="bg-mentor-light text-mentor-primary border-mentor-light">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <span className="text-mentor-primary font-medium">₹{mentor.price}/hr</span>
                      <Link to={`/mentors/${mentor.id}`}>
                        <Button variant="outline" className="border-mentor-primary text-mentor-primary text-sm">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <UserCircle className="h-16 w-16 text-gray-400" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">Aman Sharma</h3>
                    <p className="text-gray-600 mb-4">Computer Science Student | Delhi University</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                        <p className="text-gray-800">aman.sharma@example.com</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                        <p className="text-gray-800">+91 98765 43210</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Member Since</h4>
                        <p className="text-gray-800">April 2025</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Session Credits</h4>
                        <p className="text-gray-800">₹2000</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge variant="outline" className="bg-mentor-light text-mentor-primary border-mentor-light">
                        Programming
                      </Badge>
                      <Badge variant="outline" className="bg-mentor-light text-mentor-primary border-mentor-light">
                        Career Guidance
                      </Badge>
                      <Badge variant="outline" className="bg-mentor-light text-mentor-primary border-mentor-light">
                        Interview Prep
                      </Badge>
                    </div>
                    
                    <Button variant="outline" className="border-mentor-primary text-mentor-primary">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
