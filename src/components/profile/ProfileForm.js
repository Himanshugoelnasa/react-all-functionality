import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

import {
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Save,
  Bell,
  Trash2,
  Shield
} from "lucide-react";

import { user as initialUser } from "../../utils/mockData";

export function ProfileForm() {
  const [formData, setFormData] = useState(initialUser);
  const [isSaving, setIsSaving] = useState(false);

  /* ✅ Removed React.ChangeEvent */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      console.log("Saved:", formData);
    }, 1000);
  };

  /* ✅ Removed prop typing */
  const InputGroup = ({
    icon: Icon,
    label,
    id,
    type = "text",
    placeholder,
    value,
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </Label>

      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

        <Input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 rounded-xl"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
        <CardHeader className="px-8 pt-8 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-stone-900">Basic Information</CardTitle>
              <CardDescription className="text-stone-500">Update your name and public details.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup icon={User} label="First Name" id="firstName" value={formData.firstName} placeholder="e.g. Alex" />
            <InputGroup icon={User} label="Last Name" id="lastName" value={formData.lastName} placeholder="e.g. Morgan" />
          </div>
          <InputGroup icon={User} label="Username" id="username" value={formData.username} placeholder="e.g. alexm_design" />
        </CardContent>
      </Card>

      {/* Contact Details */}
      <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
        <CardHeader className="px-8 pt-8 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-stone-900">Contact Information</CardTitle>
              <CardDescription className="text-stone-500">Manage how we reach you.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup icon={Mail} label="Email Address" id="email" type="email" value={formData.email} placeholder="alex@example.com" />
            <InputGroup icon={Phone} label="Phone Number" id="phone" type="tel" value={formData.phone} placeholder="+1 (555) 000-0000" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup icon={MapPin} label="Location" id="location" value={formData.location} placeholder="City, Country" />
            <InputGroup icon={Globe} label="Website" id="website" type="url" value={formData.website} placeholder="https://yourwebsite.com" />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
        <CardHeader className="px-8 pt-8 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-stone-900">Preferences</CardTitle>
              <CardDescription className="text-stone-500">Manage your account settings.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-1">
          <div className="flex items-center justify-between py-4 border-b border-stone-50 last:border-0">
            <div>
              <p className="font-medium text-stone-900">Email Notifications</p>
              <p className="text-sm text-stone-500 mt-0.5">Receive emails about your activity.</p>
            </div>
            <button 
              onClick={() => setFormData(prev => ({ ...prev, notifications: !prev.notifications }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 ${formData.notifications ? 'bg-stone-900' : 'bg-stone-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${formData.notifications ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium text-stone-900">Public Profile</p>
              <p className="text-sm text-stone-500 mt-0.5">Make your profile visible to everyone.</p>
            </div>
            <button 
              onClick={() => setFormData(prev => ({ ...prev, publicProfile: !prev.publicProfile }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 ${formData.publicProfile ? 'bg-stone-900' : 'bg-stone-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${formData.publicProfile ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4">
        <Button variant="ghost" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl text-sm font-medium">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Account
        </Button>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-xl border-stone-300 text-stone-700 hover:bg-stone-50 h-12 px-8 font-medium">
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 sm:flex-none bg-stone-900 hover:bg-stone-800 text-white rounded-xl h-12 px-8 font-medium shadow-lg shadow-stone-900/20 transition-all"
          >
            {isSaving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* 🔥 Cleaner Toggle Component */
function Toggle({ icon: Icon, title, desc, active, onClick }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50/50">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
          <Icon className="w-5 h-5" />
        </div>

        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-slate-500">{desc}</p>
        </div>
      </div>

      <button
        onClick={onClick}
        className={`w-12 h-6 rounded-full p-1 transition ${
          active ? "bg-indigo-600" : "bg-slate-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
            active ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}
