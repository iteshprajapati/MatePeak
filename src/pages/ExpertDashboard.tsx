
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Search, Calendar, Users, UserCircle, Gift } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ExpertDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/expert/login');
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-matepeak-primary">MatePeak</h1>
        </div>
        <nav className="p-4 space-y-2">
          <button className="flex items-center gap-3 w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Search className="h-5 w-5" />
            <span>Home</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Calendar className="h-5 w-5" />
            <span>Bookings</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Users className="h-5 w-5" />
            <span>Find People</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <UserCircle className="h-5 w-5" />
            <span>Profile</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Gift className="h-5 w-5" />
            <span>Rewards</span>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Home</h1>
            <div className="relative w-96">
              <Input
                type="text"
                placeholder="Ask topmate AI or Search"
                className="pl-4 pr-10"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Daily Challenge Card */}
          <div className="bg-[#FDF7F3] rounded-lg p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-gray-600">DAILY CHALLENGE</span>
                <h2 className="text-2xl font-semibold mt-2 text-[#66332B]">
                  Find three experts via<br />AI Search
                </h2>
                <button className="flex items-center gap-2 mt-4 text-[#66332B]">
                  <span>Find Experts</span>
                  <Search className="h-5 w-5" />
                </button>
              </div>
              <span className="bg-white px-3 py-1 rounded-full text-sm">
                Upto ₹1000
              </span>
            </div>
          </div>

          {/* Referral Card */}
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-[#E8F5DC] p-3 rounded-lg">
                  <Users className="h-6 w-6 text-[#76B226]" />
                </div>
                <div>
                  <h3 className="font-semibold">Apply to jobs with referral</h3>
                  <p className="text-sm text-gray-600">
                    Increases likelihood of getting a job by 10x
                  </p>
                </div>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                Get Referred
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
