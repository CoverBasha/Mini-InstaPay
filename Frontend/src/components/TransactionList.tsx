import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import axios from 'axios';

interface Transaction {
  tid: number;
  senderID: number;
  receiverID: number;
  amount: number;
  status: 'Pending' | 'Sent' | 'Failed';
  time: string;
  sender?: {
    userName: string;
  };
  receiver?: {
    userName: string;
  };
}

interface TransactionListProps {
  limit?: number;
  filter?: 'all' | 'sent' | 'received';
}

const TransactionList = ({ limit, filter = 'all' }: TransactionListProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const storedUser = localStorage.getItem('instaPay_user');
        if (!storedUser) {
          setError('User not found');
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);
        const response = await axios.get(`https://localhost:7204/api/transactions/getTransactions?userId=${user.userID}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          }
        });
        
        if (response.data) {
          setTransactions(response.data);
        }
      } catch (err) {
        setError('Failed to fetch transactions');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    const storedUser = localStorage.getItem('instaPay_user');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    const isSender = currentUser && transaction.senderID === currentUser.userID;

    switch (filter) {
      case 'sent':
        return isSender;
      case 'received':
        return !isSender;
      default:
        return true;
    }
  });

  const limitedTransactions = limit ? filteredTransactions.slice(0, limit) : filteredTransactions;

  if (loading) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        Loading transactions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (filteredTransactions.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No {filter !== 'all' ? filter : ''} transactions to display.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {limitedTransactions.map((transaction) => {
        const storedUser = localStorage.getItem('instaPay_user');
        const currentUser = storedUser ? JSON.parse(storedUser) : null;
        const isSender = currentUser && transaction.senderID === currentUser.userID;
        const otherParty = isSender ? transaction.receiver?.userName : transaction.sender?.userName;

        return (
          <div key={transaction.tid} className="flex items-center justify-between border-b pb-4 last:border-0">
            <div className="flex items-center">
              <div className={`p-2 rounded-full mr-3 ${isSender ? 'bg-red-100' : 'bg-success bg-opacity-20'}`}>
                {isSender ? (
                  <ArrowUpRight className={`h-5 w-5 text-red-500`} />
                ) : (
                  <ArrowDownLeft className={`h-5 w-5 text-success`} />
                )}
              </div>
              <div>
                <p className="font-medium">
                  {isSender ? `Sent to ${otherParty}` : `Received from ${otherParty}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.time).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <div className={`font-semibold ${isSender ? 'text-red-600' : 'text-success'}`}>
              {isSender ? '-' : '+'}${transaction.amount.toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;
