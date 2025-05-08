
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  recipient: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionListProps {
  limit?: number;
}

const TransactionList = ({ limit }: TransactionListProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, this would be fetched from an API
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'send',
        amount: 50.00,
        recipient: 'Jane Smith',
        date: '2025-04-27T14:30:00Z',
        status: 'completed'
      },
      {
        id: '2',
        type: 'receive',
        amount: 120.50,
        recipient: 'Mike Johnson',
        date: '2025-04-26T09:15:00Z',
        status: 'completed'
      },
      {
        id: '3',
        type: 'send',
        amount: 25.75,
        recipient: 'Sarah Wilson',
        date: '2025-04-24T16:45:00Z',
        status: 'completed'
      },
      {
        id: '4',
        type: 'receive',
        amount: 75.00,
        recipient: 'Robert Davis',
        date: '2025-04-22T11:20:00Z',
        status: 'completed'
      },
      {
        id: '5',
        type: 'send',
        amount: 30.00,
        recipient: 'Emily Brown',
        date: '2025-04-20T08:30:00Z',
        status: 'completed'
      },
      {
        id: '6',
        type: 'receive',
        amount: 200.00,
        recipient: 'David Miller',
        date: '2025-04-18T14:00:00Z',
        status: 'completed'
      },
      {
        id: '7',
        type: 'send',
        amount: 15.25,
        recipient: 'Lisa Moore',
        date: '2025-04-16T09:45:00Z',
        status: 'completed'
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 500);
  }, []);

  const limitedTransactions = limit ? transactions.slice(0, limit) : transactions;

  if (loading) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        Loading transactions...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No transactions to display.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {limitedTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between border-b pb-4 last:border-0">
          <div className="flex items-center">
            <div className={`p-2 rounded-full mr-3 ${transaction.type === 'send' ? 'bg-red-100' : 'bg-success bg-opacity-20'}`}>
              {transaction.type === 'send' ? (
                <ArrowUpRight className={`h-5 w-5 text-red-500`} />
              ) : (
                <ArrowDownLeft className={`h-5 w-5 text-success`} />
              )}
            </div>
            <div>
              <p className="font-medium">
                {transaction.type === 'send' ? `Sent to ${transaction.recipient}` : `Received from ${transaction.recipient}`}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(transaction.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className={`font-semibold ${transaction.type === 'send' ? 'text-red-600' : 'text-success'}`}>
            {transaction.type === 'send' ? '-' : '+'}${transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
