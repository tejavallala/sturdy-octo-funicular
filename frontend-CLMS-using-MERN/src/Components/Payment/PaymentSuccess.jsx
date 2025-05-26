import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        if (sessionId) {
          await axios.post('https://learning-managment-system-using-mern.onrender.com/payment/payment-success', {
            sessionId
          });
          // Clear cart from localStorage if you're storing it there
          localStorage.removeItem('cart');
        }
      } catch (error) {
        console.error('Error updating payment status:', error);
      }
    };

    updatePaymentStatus();
  }, [sessionId]);

  return (
    <div className="container py-5 text-center">
      <FaCheckCircle className="text-success mb-4" size={64} />
      <h2 className="mb-4">Payment Successful!</h2>
      <p className="text-muted mb-4">
        Thank you for your purchase. Your courses are now available in your dashboard.
      </p>
      <div className="mt-4">
        <button 
          className="btn btn-primary me-3"
          onClick={() => navigate('/my-courses')}
        >
          Go to My Courses
        </button>
        <button 
          className="btn btn-outline-primary"
          onClick={() => navigate('/view-courses')}
        >
          Browse More Courses
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;