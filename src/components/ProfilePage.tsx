import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Camera,
  Award,
  TrendingUp,
  Wallet,
  Target,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface ProfilePageProps {
  onBack: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const userStats = [
    {
      id: "transactions",
      label: "Transactions",
      value: "1,234",
      icon: TrendingUp,
      colors: { bg: "bg-blue-100", text: "text-blue-600" },
    },
    {
      id: "accounts",
      label: "Accounts",
      value: "8",
      icon: Wallet,
      colors: { bg: "bg-purple-100", text: "text-purple-600" },
    },
    {
      id: "goals",
      label: "Goals",
      value: "5",
      icon: Target,
      colors: { bg: "bg-green-100", text: "text-green-600" },
    },
    {
      id: "streak",
      label: "Day Streak",
      value: "45",
      icon: Award,
      colors: { bg: "bg-orange-100", text: "text-orange-600" },
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl">Profile</h1>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Edit3 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Header Card */}
        <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <User className="h-12 w-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border-2 border-background hover:bg-muted transition-colors">
                  <Camera className="h-4 w-4 text-blue-600" />
                </button>
              </div>

              {/* User Info */}
              <h2 className="text-2xl font-semibold mb-1">Rajesh Kumar</h2>
              <p className="text-muted-foreground mb-4">Premium Member</p>

              {/* Member Since Badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Member since Jan 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {userStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.id} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className={`p-3 rounded-full ${stat.colors.bg}`}>
                      <Icon className={`h-5 w-5 ${stat.colors.text}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Personal Information */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
            Personal Information
          </h3>
          <Card>
            <CardContent className="p-0 divide-y">
              {/* Email */}
              <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="p-2 rounded-full bg-red-100">
                  <Mail className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Email</div>
                  <div className="font-medium">rajesh.kumar@email.com</div>
                </div>
                <Edit3 className="h-4 w-4 text-muted-foreground" />
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="p-2 rounded-full bg-green-100">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Phone</div>
                  <div className="font-medium">+91 98765 43210</div>
                </div>
                <Edit3 className="h-4 w-4 text-muted-foreground" />
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="p-2 rounded-full bg-blue-100">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Location</div>
                  <div className="font-medium">Mumbai, Maharashtra</div>
                </div>
                <Edit3 className="h-4 w-4 text-muted-foreground" />
              </div>

              {/* Date of Birth */}
              <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="p-2 rounded-full bg-purple-100">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Date of Birth</div>
                  <div className="font-medium">15 March 1995</div>
                </div>
                <Edit3 className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Card */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-yellow-100">
                <Award className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-yellow-900 mb-1">Achievement Unlocked!</h3>
                <p className="text-sm text-yellow-700 mb-2">
                  You've maintained a 45-day tracking streak. Keep it up!
                </p>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">
                    🎯
                  </div>
                  <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">
                    🏆
                  </div>
                  <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">
                    ⭐
                  </div>
                  <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center opacity-40">
                    🎖️
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          <button className="w-full p-4 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
            <Edit3 className="h-5 w-5" />
            <span className="font-medium">Edit Profile</span>
          </button>
          <button className="w-full p-4 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors flex items-center justify-center gap-2">
            <Award className="h-5 w-5" />
            <span className="font-medium">View All Achievements</span>
          </button>
        </div>
      </div>
    </div>
  );
}
