import Input from "../common/Input";
import Button from "../common/Button";

const UpdateProfileForm = ({
  formData,
  error,
  updating,
  handleInputChange,
  handleUserUpdate,
  handleCancel
}) => {
  return (
    <form onSubmit={handleUserUpdate} className="bg-secondary-light dark:bg-secondary-dark rounded-xl p-6 shadow space-y-6">
      <Input label="Name" name="name" value={formData.name} onChange={handleInputChange('name')} />
      
      {/* CLOUDINARY FILE UPLOAD */}
      <div className="flex flex-col gap-1">
        <label className="text-text-light dark:text-text-dark text-sm font-medium">Upload Profile Picture</label>
        <input type="file"
          accept="image/*"
          onChange={(e) => handleInputChange('profile')(e)}
          className="w-full text-sm border py-3 px-4 rounded-md text-gray-700 dark:text-gray-300"
        />
      </div>

      <div className="space-y-2">
        <label className="text-text-light dark:text-text-dark text-sm font-medium">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange('bio')}
          placeholder="Tell us about yourself..."
          rows="4"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-1 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition text-sm resize-none"
        />
      </div>
      <Input label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange('phone')} />
      {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      <div className="flex gap-4">
        <Button type="submit" disabled={updating} className="flex-1">
          {updating ? 'Updating...' : 'Update Profile'}
        </Button>
        <Button type="button" onClick={handleCancel} className="flex-1 bg-gray-500 hover:bg-gray-600">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
