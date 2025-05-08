
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TransactionList from '@/components/TransactionList';

const Transactions = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button 
        variant="ghost" 
        className="mb-4 pl-0 flex items-center text-muted-foreground hover:text-foreground" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View and filter your past transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <TransactionList />
            </TabsContent>
            <TabsContent value="sent">
              <div className="py-8 text-center text-muted-foreground">
                Filter functionality will be implemented in future updates.
              </div>
            </TabsContent>
            <TabsContent value="received">
              <div className="py-8 text-center text-muted-foreground">
                Filter functionality will be implemented in future updates.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
