import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateApi } from "../../../services/axios.config";
import { toast } from "react-toastify";
import DashboardNavbar from "../../../components/Navbar/DashboardNavbar";
import Sidebar from "../../../components/Navbar/sidebar/Sidebar";
import TeacherBlobBackground from "../../../components/design/TeacherBlobBackgroung";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const CreateCourse = () => {
  const [formData, setFormData] = useState({ name: "", duration: "", description: "", thumbnail: "", category: "", price: "" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    if (field === 'thumbnail') {
      setFormData((prev) => ({ ...prev, [field]: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.description.length < 30) {
      toast.error("Description must be at least 30 characters.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('duration', formData.duration);
    formPayload.append('description', formData.description);
    formPayload.append('category', formData.category);
    formPayload.append('price', formData.price);

    if (formData.thumbnail && typeof formData.thumbnail != 'string') {
      formPayload.append('thumbnail', formData.thumbnail);
    }

    try {
      setSubmitting(true);
      await privateApi.post("/course/create", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success("Course created successfully!");
      navigate(`/dashboard-teacher`);
    } catch (err) {
      const message = err?.response?.data?.message || "Course creation failed.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <TeacherBlobBackground />
      <div className="relative z-10">
        <DashboardNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-background-dark rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Course Name"
            value={formData.name}
            onChange={handleChange("name")}
            placeholder="Enter course name"
          />

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Category</label>
            <select
              value={formData.category}
              onChange={handleChange("category")}
              className="w-full px-4 py-2 text-sm border rounded-md bg-white dark:bg-gray-800 dark:text-white"
            >
              <option value="" disabled>Select category</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Backend Development">Backend Development</option>
              <option value="Full Stack Development">Full Stack Development</option>
              <option value="DSA">DSA</option>
              <option value="Business">Business</option>  
              <option value="Designing">Designing</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Data Analysis">Data Analysis</option>
              <option value="Marketing">Marketing</option>
              <option value="Academic">Academic</option>
              <option value="JEE/NEET">JEE/NEET</option>
              <option value="Competitive">Competitive</option>
              <option value="Photography">Photography</option>
            </select>
          </div>

          <Input
            label="Duration"
            value={formData.duration}
            onChange={handleChange("duration")}
            placeholder="e.g. 4 weeks"
          />

          <Input
            label="Price (₹)"
            value={formData.price}
            onChange={handleChange("price")}
            placeholder="₹ 0000"
          />

          {/* CLOUDINARY FILE UPLOAD */}
          <div className="flex flex-col gap-1">
            <label className="text-text-light dark:text-text-dark text-sm font-medium">Thumbnail</label>
            <input type="file"
              accept="image/*"
              onChange={(e) => handleChange('thumbnail')(e)}
              className="w-full text-sm border py-3 px-4 rounded-md text-gray-700 dark:text-gray-300"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
            <textarea
              value={formData.description}
              onChange={handleChange("description")}
              rows="5"
              className="w-full px-4 py-2 text-sm border rounded-md bg-white dark:bg-gray-800 dark:text-white resize-none"
              placeholder="Minimum 30 characters"
            />
            <p className="text-xs text-gray-400">{formData.description.length}/30 characters</p>
          </div>

          <Button type="submit" disabled={submitting || formData.description.length < 30}>
            {submitting ? "Creating..." : "Create Course"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
