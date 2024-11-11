import { Navigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the MainPage
    return <Navigate to="/home" />; // Ensure this matches the route for MainPage
  }

  return children; // Render the children if authenticated
}

export default ProtectedRoute;
