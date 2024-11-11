import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../redux/authslice';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from './AuthContext'; 
import { useSelector } from 'react-redux';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
      role: data.role,
    };
  
    dispatch(setLoading(true));
  
    try {
      const res = await axios.post("http://localhost:8001/user/login", userInfo);
      console.log("Response Data:", res.data);
  
      if (res.data.success) {
        const { token, user } = res.data;
  
        // Store user and token in localStorage
        localStorage.setItem('Users', JSON.stringify(user));
        localStorage.setItem('token', token);
  
        // Update Redux state
        dispatch(setUser(user));
  
        toast.success('Login successful');
        navigate('/');
      } else {
        toast.error(res.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response ? err.response.data.message : "An unexpected error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  return (
    <div className='mt-[25vh]'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='p-8 rounded-lg shadow-lg bg-gray-800 bg-opacity-75 shadow-black max-w-md w-full mx-4 mb-[30vh]'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='text-3xl text-green-500 mb-4 flex justify-center items-center font-semibold'>Login</h1>

            <div>
              <label className='text-white mb-2' htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                className='w-full p-2 rounded-md border border-gray-400'
                placeholder='Enter your email'
                {...register('email', {
                  required: 'Enter your email',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format',
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>

            <div>
              <label className='text-white mb-2' htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                className='w-full p-2 rounded-md border border-gray-400'
                placeholder='Enter your password'
                {...register('password', { required: 'Password is required' })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>

            <div>
              <label className="text-white">Role</label>
              <select
                className="w-full p-2 rounded-md border border-gray-400"
                {...register('role', { required: 'Role is required' })}
                aria-invalid={errors.role ? "true" : "false"}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>

            {loading ? (
              <button className="w-full bg-gray-500 text-white py-2 rounded-md" disabled>
                <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </button>
            ) : (
              <button type='submit' className='w-full p-2 mt-[3vh] rounded-md bg-green-500 text-white'>
                Login
              </button>
            )}

            <div className='text-center mt-4'>
              <button
                type="button"
                onClick={() => navigate('/signup', { replace: true })}
                className='text-white'
              >
                Don't have an account? <span className='text-blue-300'>Sign up</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
