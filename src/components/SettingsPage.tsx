import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  Palette,
  Database,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Shield,
  Download,
  Trash2,
  Globe,
  ChevronDown,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface SettingsPageProps {
  onBack: () => void;
  onNavigate?: (option: string) => void;
}

export function SettingsPage({ onBack, onNavigate }: SettingsPageProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl">Settings</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <Card 
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 cursor-pointer hover:shadow-md transition-all"
          onClick={() => onNavigate?.("profile")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Rahul Sharma</h3>
                <p className="text-sm text-muted-foreground">rahul.sharma@email.com</p>
              </div>
              <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Preferences</h3>

          {/* Dark Mode */}
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${darkMode ? "bg-indigo-100" : "bg-amber-100"}`}>
                    {darkMode ? (
                      <Moon className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <Sun className="h-5 w-5 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">Dark Mode</div>
                    <div className="text-xs text-muted-foreground">Toggle dark theme</div>
                  </div>
                </div>
                <div
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    darkMode ? "bg-primary" : "bg-border"
                  } relative cursor-pointer`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      darkMode ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-red-100">
                    <Bell className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium">Notifications</div>
                    <div className="text-xs text-muted-foreground">Enable push notifications</div>
                  </div>
                </div>
                <div
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications ? "bg-primary" : "bg-border"
                  } relative cursor-pointer`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Alerts */}
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-orange-100">
                    <Bell className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium">Budget Alerts</div>
                    <div className="text-xs text-muted-foreground">Notify when exceeding budget</div>
                  </div>
                </div>
                <div
                  onClick={() => setBudgetAlerts(!budgetAlerts)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    budgetAlerts ? "bg-primary" : "bg-border"
                  } relative cursor-pointer`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      budgetAlerts ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Currency */}
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-green-100">
                    <Globe className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Currency</div>
                    <div className="text-xs text-muted-foreground">Indian Rupee (₹)</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security & Privacy */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Security & Privacy</h3>

          {/* Biometric Login */}
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">Biometric Login</div>
                    <div className="text-xs text-muted-foreground">Use fingerprint or face ID</div>
                  </div>
                </div>
                <div
                  onClick={() => setBiometricAuth(!biometricAuth)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    biometricAuth ? "bg-primary" : "bg-border"
                  } relative cursor-pointer`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      biometricAuth ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Lock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Change Password</div>
                    <div className="text-xs text-muted-foreground">Update your password</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy */}
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-indigo-100">
                    <Shield className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-medium">Privacy Policy</div>
                    <div className="text-xs text-muted-foreground">View our privacy policy</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data & Storage */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Data & Storage</h3>

          {/* Export Data */}
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-teal-100">
                    <Download className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="font-medium">Export Data</div>
                    <div className="text-xs text-muted-foreground">Download your data as CSV</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Backup & Sync */}
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-cyan-100">
                    <Database className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-medium">Backup & Sync</div>
                    <div className="text-xs text-muted-foreground">Cloud backup settings</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Clear All Data */}
          <Card
            className="cursor-pointer hover:shadow-md transition-all border-red-200"
            onClick={() => setShowDeleteDialog(true)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-red-100">
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium text-red-600">Clear All Data</div>
                    <div className="text-xs text-muted-foreground">Delete all transactions</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help & Support */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Help & Support</h3>

          {/* Help Center */}
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-pink-100">
                    <HelpCircle className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <div className="font-medium">Help Center</div>
                    <div className="text-xs text-muted-foreground">FAQs and guides</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-gray-100">
                    <Info className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">About</div>
                    <div className="text-xs text-muted-foreground">Version 1.0.0</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>

        {/* App Info */}
        <div className="text-center text-xs text-muted-foreground pt-4 pb-2">
          <p className="font-medium">Wallet Slip v1.0.0</p>
          <p className="mt-1">Made with ❤️ for Indian users</p>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? You'll need to login again to access your data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Data Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Data</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your transactions, budgets, and settings. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600">
              Delete Everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}