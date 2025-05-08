
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Send as SendIcon } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
}

const mockContacts = [
  { id: '1', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '2', name: 'Mike Johnson', email: 'mike@example.com' },
  { id: '3', name: 'Sarah Wilson', email: 'sarah@example.com' },
  { id: '4', name: 'Robert Davis', email: 'robert@example.com' },
  { id: '5', name: 'Emily Brown', email: 'emily@example.com' },
];

const Send = () => {
  const [user, setUser] = useState<User | null>(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('instaPay_user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    const amountValue = parseFloat(amount);
    
    if (isNaN(amountValue) || amountValue <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive"
      });
      return;
    }
    
    if (amountValue > user.balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough funds to complete this transfer.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Update user balance
      const updatedUser = {
        ...user,
        balance: user.balance - amountValue
      };
      
      localStorage.setItem('instaPay_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Money sent successfully!",
        description: `$${amountValue.toFixed(2)} has been sent to ${recipient}.`,
      });
      
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4 pl-0 flex items-center text-muted-foreground hover:text-foreground" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
          <CardDescription>Transfer funds to another user</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient (Email or Username)</Label>
              <Input
                id="recipient"
                type="text"
                placeholder="name@example.com"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="money-input-wrapper">
                <Input
                  id="amount"
                  type="number"
                  className="money-input"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>
              {user && (
                <p className="text-sm text-muted-foreground">
                  Available balance: ${user.balance.toFixed(2)}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Input
                id="note"
                placeholder="What's it for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  <SendIcon className="mr-2 h-4 w-4" /> Send Money
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {mockContacts.slice(0, 4).map(contact => (
              <Button 
                key={contact.id} 
                variant="outline" 
                className="justify-start overflow-hidden"
                onClick={() => setRecipient(contact.email)}
              >
                <div className="truncate">
                  <span className="block font-medium truncate">{contact.name}</span>
                  <span className="block text-xs text-muted-foreground truncate">{contact.email}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Send;
