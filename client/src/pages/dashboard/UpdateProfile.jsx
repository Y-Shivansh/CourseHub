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
        setFormData({ 
          name: userData.name || '', 
          profile: userData.profile || '', 
          bio: userData.bio || '', 
          phone: userData.phone || '' 
        });
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
    const formPayload = new FormData();

    formPayload.append('name', formData.name);
    formPayload.append('bio', formData.bio);
    formPayload.append('phone', formData.phone);

    if (formData.profile && typeof formData.profile !== 'string') {
      formPayload.append('profile', formData.profile);
    }

    try {
      setUpdating(true);
      const res = await privateApi.put('/user/update', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
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
    <div className="relative min-h-screen bg-gradient-to-br from-background-light to-gray-50 dark:from-background-dark dark:to-gray-900">
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {user.role === 'student' ? <BlobBackground /> : <TeacherBlobBackground />}
        
        {/* Additional gradient overlay for better content visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-light/20 to-background-light/40 dark:via-background-dark/20 dark:to-background-dark/40" />
      </div>

      {/* Navigation */}
      <div className="relative z-20">
        <DashboardNavbar onMenuClick={() => setIsSideBarOpen(true)} />
        <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-light dark:text-text-dark mb-2">
              Update Your Profile
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Keep your information up to date and make your profile stand out
            </p>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 lg:gap-8">
            
            {/* Left Column - Profile Overview */}
            <div className="xl:col-span-2 space-y-6">
              {/* Profile Card */}
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
                <ProfileCard user={user} />
              </div>

              {/* User Details Card */}
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
                <UserDetailsCard user={user} />
              </div>
              
              {/* Quick Stats Card */}
              <div className="bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30">
                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-3">
                  Profile Completion
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {Math.round(((user?.name ? 1 : 0) + (user?.bio ? 1 : 0) + (user?.phone ? 1 : 0) + (user?.profile ? 1 : 0)) / 4 * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-300 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.round(((user?.name ? 1 : 0) + (user?.bio ? 1 : 0) + (user?.phone ? 1 : 0) + (user?.profile ? 1 : 0)) / 4 * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Complete your profile to get the most out of CourseHub
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Update Form */}
            <div className="xl:col-span-3">
              <div className="sticky top-24">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
                  
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-primary-light to-blue-900 dark:from-primary-dark dark:to-gray-700 px-6 sm:px-8 py-6">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg mr-4">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                          Update Profile Information
                        </h2>
                        <p className="text-blue-100 text-sm mt-1">
                          Make changes to your personal details
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="p-6 sm:p-8">
                    <UpdateProfileForm
                      formData={formData}
                      error={error}
                      updating={updating}
                      handleInputChange={handleInputChange}
                      handleUserUpdate={handleUserUpdate}
                      handleCancel={() => { 
                        user.role === 'student' ? navigate('/dashboard-student') : navigate('/dashboard-teacher') 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;