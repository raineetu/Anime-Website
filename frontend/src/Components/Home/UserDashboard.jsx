import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

function UserDashboard() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Retrieve user info from localStorage
    const user = JSON.parse(localStorage.getItem('Users'));
    console.log('User data retrieved:', user); 
    if (user) {
      setUserName(user.name);
      setEmail(user.email);
      setProfileImage(user.profileImage);  
    }
  }, []);

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Form submit handler for updating profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', userName);
    formData.append('email', email);
    formData.append('password', password);
    if (profileImage) {
        formData.append('profilePicture', profileImage);
    }

    try {
        const res = await axios.put('http://localhost:8001/user/updateProfile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (res.data.success) {
            toast.success('Profile updated successfully!');
            localStorage.setItem('Users', JSON.stringify(res.data.user));
        } else {
            toast.error(res.data.message || 'Profile update failed.');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Error during profile update.');
    }
};



  return (
    <div className="pt-[16vh]">
      <div
        className="flex justify-center items-center"
        style={{
          backgroundImage: `url('studio.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          height: '26vh',
          backgroundBlendMode: 'darken',
          flexDirection: 'column',
        }}
      >
        <h1 className="text-[6vh] text-white font-semibold underline text-[#FDFEFF]">
          Hello, {userName}
        </h1>
      </div>

      <div className="bg-[#162a41] h-[80vh]">
        <h1 className="text-white text-[5vh] ml-[90vh]">
          <FontAwesomeIcon icon={faUser} className="mr-[1vh] text-green-500" />
          Edit Profile
        </h1>
        <div className="rounded-lg shadow-lg shadow-black w-[70vh] h-[48vh] bg-gray-800 bg-opacity-75 ml-[70vh] mt-[1vh] p-3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-1 ml-[1vh] text-[20px]" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-400"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-white mb-1 ml-[1vh] text-[20px]" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-400"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-white mb-1 ml-[1vh] text-[20px]" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-400"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="block text-white mb-1 ml-[1vh] text-[20px]" htmlFor="profileImage">
                Profile Image
              </label>
              <input
                type="file"
                id="profileImage"
                className="w-full p-2 rounded-md border border-gray-400"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </div>
            <button type="submit" className="w-[20vh] ml-[20vh] p-2 mt-[3vh] rounded-md bg-green-500 text-white">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
