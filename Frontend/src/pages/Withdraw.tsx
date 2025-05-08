
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Withdraw = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectMethod = (method: string) => {
    toast({
      title: "Feature coming soon",
      description: `The ${method} withdrawal method will be available in a future update.`,
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
          <CardTitle>Withdraw Money</CardTitle>
          <CardDescription>Select a withdrawal method to transfer funds from your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start h-auto py-4"
            onClick={() => handleSelectMethod("Bank Account")}
          >
            <Building className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Bank Account</div>
              <div className="text-xs text-muted-foreground">Standard transfer (1-3 business days)</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start h-auto py-4"
            onClick={() => handleSelectMethod("Debit Card")}
          >
            <CreditCard className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Debit Card</div>
              <div className="text-xs text-muted-foreground">Instant transfer (small fee applies)</div>
            </div>
          </Button>
        </CardContent>
        <CardFooter className="flex-col">
          <p className="text-sm text-muted-foreground text-center w-full mt-2">
            Standard transfers are free, instant transfers have a 1.5% fee
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Withdraw;
