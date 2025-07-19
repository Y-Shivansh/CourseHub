import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { privateApi } from '../../../services/axios.config';
import { toast } from 'react-toastify';
import Loader from '../../../components/common/Loader';
import BlobBackground from '../../../components/design/BlobBackground';
import DashboardNavbar from '../../../components/Navbar/DashboardNavbar';
import Sidebar from '../../../components/Navbar/sidebar/Sidebar';
import ProfileCard from '../../../components/Navbar/sidebar/ProfileCard';
import UserDetailsCard from '../../../components/common/UserDetailsCard';
import UpdateProfileForm from '../../../components/profile/UpdateProfileForm';

const StudentUpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', profile: '', bio: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await privateApi.get('/user/me');
        const userData = res.data.user;
        setUser(userData);
        setFormData({ name: userData.name || '', profile: userData.profile || '', bio: userData.bio || '', phone: userData.phone || '' });
        localStorage.setItem('user', JSON.stringify(userData));
      } catch {
        toast.error('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const hasChanges = Object.keys(formData).some((key) => formData[key] !== (user[key] || ''));
    if (!hasChanges) return toast.info('No changes to update');

    try {
      setUpdating(true);
      const res = await privateApi.put('/user/update', formData);
      const updatedUser = { ...user, ...res.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Profile updated successfully');
      navigate('/dashboard-student');
    } catch (err) {
      setError(err?.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen">
      <BlobBackground />
      {/* NAV */}
      <div className="relative z-10">
        <DashboardNavbar onMenuClick={() => setIsSideBarOpen(true)} />
        <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      </div>

      {/* MAINI UPDATE CONTENT */}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-text-light dark:text-text-dark text-center">Welcome! {user.name}</h2>
            <ProfileCard user={user} />

            <UserDetailsCard user={user} />
          </div>

          {/* FORM */}
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-center text-text-light dark:text-text-dark">Update Profile</h2>
            <UpdateProfileForm
              formData={formData}
              error={error}
              updating={updating}
              handleInputChange={handleInputChange}
              handleUserUpdate={handleUserUpdate}
              handleCancel={() => navigate('/dashboard-student')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentUpdateProfile;
