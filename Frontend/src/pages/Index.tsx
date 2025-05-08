
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('instaPay_user');
    if (storedUser) {
      // If logged in, redirect to dashboard
      navigate('/dashboard');
    } else {
      // If not logged in, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  // This is just a loader while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Mini-InstaPay</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
