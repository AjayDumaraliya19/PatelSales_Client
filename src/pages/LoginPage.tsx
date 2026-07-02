import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-full bg-[#f5f5f5] pt-5 pb-8 sm:pt-8 sm:pb-10">
      <div className="max-w-[560px] mx-auto px-4 sm:px-6">
        <nav className="wss-breadcrumb mb-4 text-sm">
          <Link to="/">Patel Sales</Link>
          <span className="mx-2">/</span>
          <span>Login</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Sign In</h1>
          <p className="text-sm text-gray-600">
            Access your wholesale account to view orders, track shipments, and reorder supplies.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
