const UserDetailsCard = ({ user }) => {
  return (
    <div className="bg-secondary-light dark:bg-secondary-dark rounded-xl p-6 shadow">
      <h3 className="text-lg font-semibold mb-4 text-text-light dark:text-text-dark">
        Account Details
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-text-muted">Email:</span>
          <span className="text-text-light dark:text-text-dark">{user?.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Role:</span>
          <span className="text-text-light dark:text-text-dark capitalize">{user?.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Member since:</span>
          <span className="text-text-light dark:text-text-dark">
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Enrolled Courses:</span>
          <span className="text-text-light dark:text-text-dark">
            {user?.enrolledIn?.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
