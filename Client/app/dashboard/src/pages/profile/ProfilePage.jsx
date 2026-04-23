
import ProfileHeader from "../../components/profile/ProfileHeader";
import "../../styles/profile.css";
import UsersSection from "../../components/users/UsersSection";
import { getUser } from "../../utils/auth";

function ProfilePage() {
  const user = getUser();

  return (
    <div className="profile-page">
      <ProfileHeader />

      {/* SOLO ADMIN */}
      {user?.rol === "Admin" && <UsersSection />}
    </div>
  );
}

export default ProfilePage;