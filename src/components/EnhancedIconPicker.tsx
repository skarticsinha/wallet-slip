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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EnhancedIconPickerProps {
  selectedIcon: any;
  selectedImage?: string;
  selectedIconColor: string;
  selectedBgColor: string;
  selectedImageFit: string;
  onSelectIcon: (icon: any) => void;
  onSelectImage: (imageUrl: string) => void;
  onSelectIconColor: (color: string) => void;
  onSelectBgColor: (color: string) => void;
  onSelectImageFit: (fit: string) => void;
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

const colorOptions = [
  { value: "text-red-600", label: "Red", bgValue: "bg-red-100", preview: "bg-red-600" },
  { value: "text-orange-600", label: "Orange", bgValue: "bg-orange-100", preview: "bg-orange-600" },
  { value: "text-yellow-600", label: "Yellow", bgValue: "bg-yellow-100", preview: "bg-yellow-600" },
  { value: "text-green-600", label: "Green", bgValue: "bg-green-100", preview: "bg-green-600" },
  { value: "text-teal-600", label: "Teal", bgValue: "bg-teal-100", preview: "bg-teal-600" },
  { value: "text-blue-600", label: "Blue", bgValue: "bg-blue-100", preview: "bg-blue-600" },
  { value: "text-indigo-600", label: "Indigo", bgValue: "bg-indigo-100", preview: "bg-indigo-600" },
  { value: "text-purple-600", label: "Purple", bgValue: "bg-purple-100", preview: "bg-purple-600" },
  { value: "text-pink-600", label: "Pink", bgValue: "bg-pink-100", preview: "bg-pink-600" },
  { value: "text-gray-600", label: "Gray", bgValue: "bg-gray-100", preview: "bg-gray-600" },
];

const imageFitOptions = [
  { value: "cover", label: "Cover (Fill entire space)" },
  { value: "contain", label: "Contain (Fit within space)" },
  { value: "fill", label: "Fill (Stretch to fit)" },
];

export function EnhancedIconPicker({ 
  selectedIcon, 
  selectedImage, 
  selectedIconColor,
  selectedBgColor,
  selectedImageFit,
  onSelectIcon, 
  onSelectImage,
  onSelectIconColor,
  onSelectBgColor,
  onSelectImageFit,
}: EnhancedIconPickerProps) {
  const [activeTab, setActiveTab] = useState<"icons" | "image">(selectedImage ? "image" : "icons");

  const handleImageUpload = () => {
    // Simulate image upload
    const mockImageUrl = `https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop`;
    onSelectImage(mockImageUrl);
  };

  const handleColorSelect = (colorValue: string) => {
    const colorOption = colorOptions.find(c => c.value === colorValue);
    if (colorOption) {
      onSelectIconColor(colorValue);
      onSelectBgColor(colorOption.bgValue);
    }
  };

  const SelectedIcon = selectedIcon;

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "icons" | "image")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="icons">Choose Icon</TabsTrigger>
          <TabsTrigger value="image">Upload Image</TabsTrigger>
        </TabsList>

        <TabsContent value="icons" className="space-y-4">
          {/* Icon Selection */}
          <div className="space-y-2">
            <Label>Select an icon</Label>
            <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto hide-scrollbar p-1 border rounded-lg">
              {availableIcons.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => onSelectIcon(Icon)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                    selectedIcon === Icon
                      ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/50"
                      : "bg-card hover:bg-accent border-border"
                  }`}
                  title={label}
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <Label>Icon Color</Label>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorSelect(color.value)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                    selectedIconColor === color.value
                      ? "border-primary ring-2 ring-primary/50 bg-primary/5"
                      : "border-border hover:bg-accent"
                  }`}
                  title={color.label}
                >
                  <div className={`w-6 h-6 rounded-full ${color.preview}`} />
                  <span className="text-xs">{color.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="flex items-center justify-center p-4 border rounded-lg bg-muted/30">
              <div className={`p-3 rounded-full ${selectedBgColor}`}>
                <SelectedIcon className={`h-6 w-6 ${selectedIconColor}`} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="image" className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Upload custom image</Label>
            {selectedImage ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center p-4 border rounded-lg bg-muted/30">
                  <div className={`w-16 h-16 rounded-full overflow-hidden ${selectedBgColor}`}>
                    <ImageWithFallback
                      src={selectedImage}
                      alt="Category icon"
                      className={`w-full h-full ${
                        selectedImageFit === 'contain' 
                          ? 'object-contain' 
                          : selectedImageFit === 'cover' 
                          ? 'object-cover' 
                          : 'object-fill'
                      }`}
                    />
                  </div>
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
                className="w-full h-24 border-dashed"
                onClick={handleImageUpload}
              >
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon className="h-6 w-6" />
                  <span>Upload Image</span>
                </div>
              </Button>
            )}
          </div>

          {/* Image Fit Selection */}
          {selectedImage && (
            <>
              <div className="space-y-2">
                <Label>Image Fit Style</Label>
                <Select value={selectedImageFit} onValueChange={onSelectImageFit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {imageFitOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose how the image fits within the icon circle
                </p>
              </div>

              {/* Background Color Selection */}
              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.bgValue}
                      onClick={() => onSelectBgColor(color.bgValue)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                        selectedBgColor === color.bgValue
                          ? "border-primary ring-2 ring-primary/50 bg-primary/5"
                          : "border-border hover:bg-accent"
                      }`}
                      title={color.label}
                    >
                      <div className={`w-6 h-6 rounded-full ${color.bgValue}`} />
                      <span className="text-xs">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {!selectedImage && (
            <p className="text-xs text-muted-foreground text-center">
              Upload a square image for best results (recommended 100x100px)
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
