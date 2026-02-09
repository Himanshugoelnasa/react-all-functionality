import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileForm } from "../../components/profile/ProfileForm";
import { User, Settings, LogOut, Bell, Lock } from "lucide-react";

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-stone-200">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-stone-900 rounded-xl flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-stone-900 tracking-tight">Account Settings</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl hover:bg-stone-100 text-stone-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-rose-50 text-rose-500 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column - Navigation */}
          <div className="lg:col-span-3 space-y-6">
            <div className="lg:sticky lg:top-28 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4 px-2">Menu</div>
              <nav className="space-y-1">
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-900 text-white font-medium shadow-lg shadow-stone-900/10">
                  <User className="w-5 h-5" />
                  Profile
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-stone-100 font-medium transition-all">
                  <Lock className="w-5 h-5" />
                  Security
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-stone-100 font-medium transition-all">
                  <Bell className="w-5 h-5" />
                  Notifications
                </a>
              </nav>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-9 space-y-8">
            <ProfileHeader />
            <ProfileForm />
          </div>

        </div>
      </main>
    </div>
  );
}