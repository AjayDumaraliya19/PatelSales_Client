import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/register/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="wss-breadcrumb mb-6 text-sm">
          <Link to="/" className="text-gray-600 hover:text-[#003087] transition-colors">Patel Sales</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-semibold">Create Account</span>
        </nav>

        <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] rounded-2xl p-6 lg:p-8 shadow-lg mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">Create Account</h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl">
            Register for wholesale pricing on food service supplies. Fields marked with{' '}
            <span className="text-white font-bold">*</span> are required.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
