import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { register, handleSubmit, formState: { errors }, setError, getValues } = useForm();
  const navigate = useNavigate();
  
  const [profileImage, setProfileImage] = useState(null);

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Form submit handler
  const onSubmit = async (formData) => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', formData.role);
    
    if (profileImage) {
      data.append('profilePicture', profileImage);
    }
  
    try {
      const res = await axios.post('http://localhost:8001/user/register', data);
      
      if (res.data.success) {
        toast.success('User registered successfully!');
        navigate('/');  // Redirect to the home page after successful registration
      } else {
        // If registration fails due to a user existing or another validation error
        if (res.data.message) {
          if (res.data.message.includes('User already exists')) {
            setError('email', {
              type: 'manual',
              message: 'Email is already registered',
            });
          } else {
            toast.error(res.data.message || 'Registration failed');
          }
        }
      }
    } catch (error) {
      // Detailed logging
      console.error('Error during user registration:', error.response?.data);
      
      // Check for specific server-side errors like "User already exists"
      if (error.response?.data?.message.includes('User already exists')) {
        setError('email', {
          type: 'manual',
          message: 'Email is already registered',
        });
      } else {
        toast.error(error.response?.data?.message || 'Error during user registration!');
      }
    }
  };

  return (
    <div className="w-full h-screen bg-cover bg-center pt-[17vh]" style={{ backgroundImage: "url('https://wallpapercave.com/wp/GF8TwqI.jpg')" }}>
      <div className="flex justify-center items-center relative">
        <div className="p-8 rounded-lg max-w-md w-full shadow-lg bg-gray-800 bg-opacity-75">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <h1 className="text-3xl text-green-500 mb-4 text-center">Create an Account</h1>

            {/* Name Input */}
            <div>
              <label className="text-white">Name</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border border-gray-400"
                placeholder="Enter your name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="text-white">Email</label>
              <input
                type="email"
                className="w-full p-2 rounded-md border border-gray-400"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Entered value does not match email format',
                  },
                })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label className="text-white">Password</label>
              <input
                type="password"
                className="w-full p-2 rounded-md border border-gray-400"
                placeholder="Enter your password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="text-white">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 rounded-md border border-gray-400"
                placeholder="Confirm your password"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === getValues('password') || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-white">Role</label>
              <select
                className="w-full p-2 rounded-md border border-gray-400"
                {...register('role', { required: 'Role is required' })}
              >
                <option value="user">User</option>
              </select>
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>

            {/* Profile Image Upload */}
            <div>
              <label className="text-white">Profile Image</label>
              <input
                type="file"
                className="w-full p-2 rounded-md border border-gray-400"
                accept="image/*" // Ensure it only accepts image files
                onChange={handleProfileImageChange}
              />
            </div>

            <button type="submit" className="w-full mt-4 p-2 bg-green-500 text-white rounded-md">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
