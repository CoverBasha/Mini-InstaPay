
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, Building, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const AddMoney = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectMethod = (method: string) => {
    toast({
      title: "Feature coming soon",
      description: `The ${method} payment method will be available in a future update.`,
    });
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
          <CardTitle>Add Money</CardTitle>
          <CardDescription>Select a payment method to add funds to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start h-auto py-4"
            onClick={() => handleSelectMethod("Credit/Debit Card")}
          >
            <CreditCard className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Credit/Debit Card</div>
              <div className="text-xs text-muted-foreground">Add funds instantly using your card</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start h-auto py-4"
            onClick={() => handleSelectMethod("Bank Transfer")}
          >
            <Building className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Bank Transfer</div>
              <div className="text-xs text-muted-foreground">Transfer funds from your bank account (1-3 business days)</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start h-auto py-4"
            onClick={() => handleSelectMethod("Digital Wallet")}
          >
            <Wallet className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Digital Wallet</div>
              <div className="text-xs text-muted-foreground">Connect your digital wallet for instant transfers</div>
            </div>
          </Button>
        </CardContent>
        <CardFooter className="flex-col">
          <p className="text-sm text-muted-foreground text-center w-full mt-2">
            All transactions are secure and encrypted
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddMoney;
