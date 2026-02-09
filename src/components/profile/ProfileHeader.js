import { Camera, MapPin, Briefcase, Calendar, Mail, LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { user } from "../../utils/mockData";

export function ProfileHeader() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200 text-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* Avatar */}
        <div className="relative group">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-stone-100 ring-1 ring-stone-200">
            <img 
              src={user.avatar} 
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <button className="absolute bottom-0 right-0 w-9 h-9 bg-stone-900 text-white rounded-full flex items-center justify-center shadow-md hover:bg-stone-800 transition-colors border-2 border-white">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Name & Role */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-stone-500 font-medium">@{user.username}</p>
          <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed">
            {user.bio}
          </p>
        </div>

        {/* Meta Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-stone-600">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 rounded-full border border-stone-100">
            <Briefcase className="w-3.5 h-3.5 text-stone-400" />
            {user.role}
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 rounded-full border border-stone-100">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            {user.location}
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 rounded-full border border-stone-100">
            <Mail className="w-3.5 h-3.5 text-stone-400" />
            {user.email}
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 rounded-full border border-stone-100">
            <LinkIcon className="w-3.5 h-3.5 text-stone-400" />
            {user.website}
          </span>
        </div>
      </div>
    </div>
  );
}