import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { adminLogin } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await adminLogin(data);
      login(response.data);
      toast.success('Login successful!');
      navigate('/admin/projects');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid credentials';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Admin Login</h2>
          <p className="text-gray-300">Sign in to access the admin panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email / Username
              </label>
              <input
                type="text"
                id="email"
                {...register('email', { required: 'Email is required' })}
                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email or username"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password', { required: 'Password is required' })}
                className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-primary text-sm hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-primary text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Default Credentials Info */}
        <div className="mt-6 bg-blue-900/50 backdrop-blur-lg rounded-lg p-4 text-center">
          <p className="text-blue-100 text-sm">
            Default credentials: <span className="font-semibold">divy@gmail.com</span> / <span className="font-semibold">4235divy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
