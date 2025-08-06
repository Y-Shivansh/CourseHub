import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { privateApi } from '../../services/axios.config';
import { toast } from 'react-toastify';
import Loader from '../../components/common/Loader';
import BlobBackground from '../../components/design/BlobBackground';
import DashboardNavbar from '../../components/Navbar/DashboardNavbar';
import Sidebar from '../../components/Navbar/sidebar/Sidebar';
import ProfileCard from '../../components/Navbar/sidebar/ProfileCard';
import UserDetailsCard from '../../components/common/UserDetailsCard';
import UpdateProfileForm from '../../components/profile/UpdateProfileForm';
import TeacherBlobBackground from '../../components/design/TeacherBlobBackgroung';

const UpdateProfile = () => {
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
        localStorage.setItem('coursehub_user', JSON.stringify(userData));
      } catch {
        toast.error('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleInputChange = (field) => (e) => {
    if (field === 'profile') {
      setFormData((prev) => ({ ...prev, profile: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }
    setError('');
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const formPayload = new FormData(); // FormData() is a JS-native way to send multipart/form-data content (required for file uploads).

    formPayload.append('name', formData.name);
    formPayload.append('bio', formData.bio);
    formPayload.append('phone', formData.phone);

    if (formData.profile && typeof formData.profile !== 'string') {
      formPayload.append('profile', formData.profile); // image file
    }

    try {
      setUpdating(true);
      const res = await privateApi.put('/user/update', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data' // for multer
        }
      });

      const updatedUser = { ...user, ...res.data.user };
      localStorage.setItem('coursehub_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Profile updated successfully');
      user.role === 'student' ? navigate('/dashboard-student') : navigate('/dashboard-teacher');
    } catch (err) {
      setError(err?.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };


  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen">

      {user.role === 'student' ? <BlobBackground /> : <TeacherBlobBackground />}

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
              handleCancel={() => { user.role === 'student' ? navigate('/dashboard-student') : navigate('/dashboard-teacher') }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
