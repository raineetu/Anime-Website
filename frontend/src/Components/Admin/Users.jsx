import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch users from the API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8001/user/users');

      console.log('API Response:', response.data); // Debugging line

      // Check if the response data contains the 'users' key
      if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users); // Accessing the 'users' array
      } else {
        setError('No users found.');
      }

    } catch (err) {
      console.error(err); // Log any errors for debugging
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="fixed inset-0 mt-[14vh] flex items-center justify-center z-50">
      {loading ? (
        <p className="text-center text-blue-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="w-[50%] ml-[19vh]">
          <table className="min-w-full bg-gray-800 text-white rounded-md shadow-lg">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
  {users.map((user, index) => (
    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-900">
      <td className="p-4">{index + 1}</td> {/* Serial Number */}
      <td className="p-4">{user.name}</td>
      <td className="p-4">{user.email}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
