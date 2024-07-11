import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/slices/authSlice";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authObject = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = authObject;
  if (!token) {
    return <Navigate to="/login" />;
  }
  try {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      alert("Session Expired, please login again");
      dispatch(logout());
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
    navigate("/login");
  }
  return children;
};
