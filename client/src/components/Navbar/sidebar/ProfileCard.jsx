// Plan for now: profile image, name, role, bio and Edit button	
import profileAvatar from "../../../assets/profileAvatar.svg"
import { Link } from "react-router-dom"
import { Pen } from "lucide-react"

const ProfileCard = ({ user, isDark = true }) => {
  if (!user) return null;

  const applyDark = isDark ? "dark:bg-secondary-dark dark:text-text-dark" : ""

  return (
    <div>
      <div className={`bg-secondary-light rounded-xl p-6 shadow text-center ${applyDark}`}>
        <img
          src={user.profile || profileAvatar}
          alt={user.name || "User Avatar"}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
        />
        <h3 className={`text-xl font-semibold text-text-light ${applyDark}`}>
          {user.name}
        </h3>
        <p className="text-sm text-text-muted">{user.email}</p>
        <p className={`border-t-[0.3px] border-gray-400 pt-2 mt-2 text-sm text-text-light ${applyDark}`}>
          {user.bio || "No bio provided."}
        </p>

        {user.role === 'student' ? (
          <Link
            className="mt-2 text-sm underline flex gap-1 items-center justify-end dark:text-text-muted dark:hover:text-text-dark hover:text-text-muted text-text-light"
            to={"/update-student"}
          >
            <Pen size={13} />  Profile
          </Link>
        ) : (
          <Link
            className="mt-2 text-sm underline flex gap-1 items-center justify-end dark:text-text-muted dark:hover:text-text-light hover:text-text-muted text-text-light"
            to={"/update-teacher"}
          >
            <Pen size={13} />  Profile
          </Link>
        )
        }


      </div>
    </div>
  );
};

export default ProfileCard
