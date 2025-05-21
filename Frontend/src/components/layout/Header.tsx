import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Send, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import NotificationPanel from '@/components/notifications/NotificationPanel';

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    // In a real app, this would clear the auth state
    localStorage.removeItem('instaPay_user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center">
          <div className="bg-primary rounded-full p-1 mr-2">
            <Send size={18} className="text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-primary">Mini-InstaPay</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <NotificationPanel />
          <Button variant="ghost" size="icon">
            <User size={20} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
