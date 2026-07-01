import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/register/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-full bg-[#f5f5f5] py-6 sm:py-8">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <nav className="wss-breadcrumb mb-4 text-sm">
          <Link to="/">Patel Sales</Link>
          <span className="mx-2">/</span>
          <span>Register</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-sm text-[#e8471e] font-medium sm:pt-2">
            Fields marked with <span className="font-bold">*</span> are required
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
