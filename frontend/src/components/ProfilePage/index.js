import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import AdminDashboard from "../AdminDashboard";
import CustomerDashboard from "../CustomerDashboard";
import "./ProfilePage.css";

function ProfilePage() {
  const sessionUser = useSelector((state) => state.session.user);
  const isAdmin = sessionUser?.id === 1;

  if (!sessionUser) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div>
        {isAdmin ? (
          <AdminDashboard />
        ) : (
          <CustomerDashboard />
        )}
      </div>
    </>
  );
}

export default ProfilePage;
