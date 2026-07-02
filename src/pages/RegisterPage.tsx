import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/register/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-full bg-[var(--background)] pt-5 pb-8 sm:pt-8 sm:pb-10">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6">
        <nav className="wss-breadcrumb mb-4 text-xs sm:text-sm" aria-label="Breadcrumb">
          <Link to="/">Patel Sales</Link>
          <span className="mx-2">/</span>
          <span>Create Account</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Create Account</h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Register for wholesale pricing on food service supplies. Fields marked with{' '}
            <span className="text-[var(--primary)] font-bold">*</span> are required.
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
