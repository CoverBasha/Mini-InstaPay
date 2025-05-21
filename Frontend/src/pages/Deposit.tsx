import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

interface User {
  userID: number;
  userName: string;
  password: string;
  phoneNum: string;
  balance: number;
}

const Deposit = () => {
  const [user, setUser] = useState<User | null>(null);
  const [amount, setAmount] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        `https://localhost:8000/api/users/charge?amount=${amountValue}&userId=${user.userID}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      if (response.data) {
        // Update user balance in localStorage
        const updatedUser = {
          ...user,
          balance: user.balance + amountValue
        };
        localStorage.setItem('instaPay_user', JSON.stringify(updatedUser));
        
        toast({
          title: "Deposit successful!",
          description: `$${amountValue.toFixed(2)} has been added to your balance.`,
        });
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Deposit failed",
        description: error.response?.data || "Failed to deposit money. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
          <CardTitle>Charge Balance</CardTitle>
          <CardDescription>Charge money into your account balance</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
                  Current balance: ${user.balance.toFixed(2)}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  <ArrowDownLeft className="mr-2 h-4 w-4" /> Deposit
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Deposit;
