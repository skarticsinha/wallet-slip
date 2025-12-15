import { useState } from "react";
import { 
  ShoppingCart, Utensils, Car, Home, Zap, Heart, ShoppingBag, 
  GraduationCap, Coffee, Plane, Smartphone, Tv, Music, Book, 
  Gamepad2, Dumbbell, Pizza, Gift, Briefcase, Wallet, CreditCard,
  Wrench, Scissors, Paintbrush, Camera, Film, Headphones, Watch,
  Shirt, Droplet, Sparkles, Upload, Image as ImageIcon
} from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface IconPickerProps {
  selectedIcon: any;
  selectedImage?: string;
  onSelectIcon: (icon: any) => void;
  onSelectImage: (imageUrl: string) => void;
}

const availableIcons = [
  { icon: ShoppingCart, label: "Cart" },
  { icon: Utensils, label: "Food" },
  { icon: Car, label: "Car" },
  { icon: Home, label: "Home" },
  { icon: Zap, label: "Electric" },
  { icon: Heart, label: "Health" },
  { icon: ShoppingBag, label: "Shopping" },
  { icon: GraduationCap, label: "Education" },
  { icon: Coffee, label: "Coffee" },
  { icon: Plane, label: "Travel" },
  { icon: Smartphone, label: "Phone" },
  { icon: Tv, label: "TV" },
  { icon: Music, label: "Music" },
  { icon: Book, label: "Book" },
  { icon: Gamepad2, label: "Gaming" },
  { icon: Dumbbell, label: "Fitness" },
  { icon: Pizza, label: "Pizza" },
  { icon: Gift, label: "Gift" },
  { icon: Briefcase, label: "Work" },
  { icon: Wallet, label: "Wallet" },
  { icon: CreditCard, label: "Card" },
  { icon: Wrench, label: "Tools" },
  { icon: Scissors, label: "Salon" },
  { icon: Paintbrush, label: "Art" },
  { icon: Camera, label: "Camera" },
  { icon: Film, label: "Movies" },
  { icon: Headphones, label: "Audio" },
  { icon: Watch, label: "Watch" },
  { icon: Shirt, label: "Clothing" },
  { icon: Droplet, label: "Water" },
  { icon: Sparkles, label: "Beauty" },
];

export function IconPicker({ selectedIcon, selectedImage, onSelectIcon, onSelectImage }: IconPickerProps) {
  const [activeTab, setActiveTab] = useState<"icons" | "image">("icons");

  const handleImageUpload = () => {
    // Simulate image upload
    const mockImageUrl = `https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop`;
    onSelectImage(mockImageUrl);
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "icons" | "image")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="icons">Choose Icon</TabsTrigger>
          <TabsTrigger value="image">Upload Image</TabsTrigger>
        </TabsList>

        <TabsContent value="icons" className="space-y-2">
          <Label>Select an icon</Label>
          <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto hide-scrollbar p-1">
            {availableIcons.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => onSelectIcon(Icon)}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                  selectedIcon === Icon
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card hover:bg-accent border-border"
                }`}
                title={label}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="image" className="space-y-4">
          <div className="space-y-2">
            <Label>Upload custom image</Label>
            {selectedImage ? (
              <div className="space-y-2">
                <div className="w-20 h-20 rounded-lg border overflow-hidden mx-auto">
                  <ImageWithFallback
                    src={selectedImage}
                    alt="Category icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleImageUpload}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Change Image
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleImageUpload}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            )}
            <p className="text-xs text-muted-foreground text-center">
              Upload a square image (recommended 100x100px)
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
