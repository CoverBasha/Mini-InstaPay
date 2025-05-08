
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Shield, BellRing } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  balance: number;
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('instaPay_user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setName(userData.name || '');
    setEmail(userData.email || '');
    setPhone(userData.phone || '');
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        const updatedUser = {
          ...user,
          name,
          email,
          phone
        };
        
        localStorage.setItem('instaPay_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      
      setIsLoading(false);
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 1000);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4 pl-0 flex items-center text-muted-foreground hover:text-foreground" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </Button>
      
      <div className="mb-6 flex items-center">
        <div className="bg-primary text-primary-foreground rounded-full p-3 mr-4">
          <User size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Manage your account details</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
                placeholder="Optional"
              />
            </div>
          </CardContent>
          
          <CardFooter>
            {isEditing ? (
              <div className="flex w-full gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            ) : (
              <Button 
                type="button" 
                className="w-full"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
      
      <div className="grid grid-cols-1 gap-4">
        <Button variant="outline" className="justify-start h-auto py-4">
          <Shield className="mr-3 h-5 w-5" />
          <div className="text-left">
            <div className="font-medium">Security Settings</div>
            <div className="text-sm text-muted-foreground">Update password and security preferences</div>
          </div>
        </Button>
        
        <Button variant="outline" className="justify-start h-auto py-4">
          <BellRing className="mr-3 h-5 w-5" />
          <div className="text-left">
            <div className="font-medium">Notification Settings</div>
            <div className="text-sm text-muted-foreground">Manage notification preferences</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Profile;
