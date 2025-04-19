
import { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { Camera, Linkedin, Twitter, Instagram } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileSetupStep({ form }: { form: UseFormReturn<any> }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("profilePicture", file);
    }
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Profile Setup</h3>
      <p className="text-gray-600 mb-4">Finalize your profile with a picture and bio.</p>
      
      <div className="flex flex-col items-center mb-6">
        <FormField
          control={form.control}
          name="profilePicture"
          render={() => (
            <FormItem className="space-y-3">
              <FormControl>
                <div
                  onClick={handleProfilePictureClick}
                  className="cursor-pointer"
                >
                  <Avatar className="h-24 w-24 cursor-pointer border-2 border-gray-200">
                    <AvatarImage src={form.watch("profilePicture") ? URL.createObjectURL(form.watch("profilePicture")) : ""} />
                    <AvatarFallback className="bg-gray-200 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-500" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </FormControl>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <FormDescription className="text-center">
                Click to upload profile picture
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about yourself, your expertise, and what mentees can expect from your sessions..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="space-y-4">
        <h4 className="font-medium">Social Links</h4>
        
        <FormField
          control={form.control}
          name="socialLinks.linkedin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="mr-2 bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Input placeholder="LinkedIn profile URL" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="socialLinks.twitter"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="mr-2 bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Input placeholder="Twitter profile URL" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="socialLinks.instagram"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="mr-2 bg-gradient-to-r from-[#FFDC80] via-[#F77737] to-[#C13584] text-white hover:opacity-90"
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Input placeholder="Instagram profile URL" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
