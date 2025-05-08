
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Clock, DollarSign, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TransactionList from '@/components/TransactionList';

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('instaPay_user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    // Get user data
    setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardDescription>Current balance</CardDescription>
            <CardTitle className="text-3xl font-bold">
              ${user?.balance.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button onClick={() => navigate('/send')} className="flex-1">
                <ArrowUp className="mr-2 h-4 w-4" /> Send
              </Button>
              <Button onClick={() => navigate('/request')} className="flex-1" variant="outline">
                <ArrowDown className="mr-2 h-4 w-4" /> Request
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="flex flex-col h-20 items-center justify-center" onClick={() => navigate('/add-money')}>
              <DollarSign className="h-6 w-6 mb-1" />
              <span>Add Money</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20 items-center justify-center" onClick={() => navigate('/withdraw')}>
              <CreditCard className="h-6 w-6 mb-1" />
              <span>Withdraw</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20 items-center justify-center" onClick={() => navigate('/transactions')}>
              <Clock className="h-6 w-6 mb-1" />
              <span>History</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20 items-center justify-center" onClick={() => navigate('/profile')}>
              <DollarSign className="h-6 w-6 mb-1" />
              <span>Profile</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest activity</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionList limit={5} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
