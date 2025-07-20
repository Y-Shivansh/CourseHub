import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { privateApi } from "../../../services/axios.config";
import Input from "../../common/Input";
import Button from "../../common/Button";
import Loader from "../../common/Loader";
import { toast } from "react-toastify";

const EditCourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    description: "",
    thumbnail: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await privateApi.get(`/course/${id}`);
        const course = res.data.course;
        setFormData({
          name: course.name || "",
          duration: course.duration || "",
          description: course.description || "",
          thumbnail: course.thumbnail || "",
          category: course.category || "",
        });
      } catch (err) {
        toast.error("Failed to fetch course", { toastId: "fetchError" });
        console.error(err?.response?.data?.message || err)
        navigate("/my-courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, navigate]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await privateApi.put(`/course/update/${id}`, formData);
      toast.success("Course updated successfully!");
      navigate("/my-courses");
    } catch (err) {
      const message = err?.response?.data?.message || "Update failed.";
      toast.error(message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit}
      className="border-l-1 border-gray-300 dark:border-gray-700 p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Edit Course
      </h2>

      <Input
        label="Name"
        value={formData.name}
        onChange={handleChange("name")}
        placeholder="Enter course name"
      />
      <Input
        label="Duration"
        value={formData.duration}
        onChange={handleChange("duration")}
        placeholder="e.g. 6 weeks"
      />
      <Input
        label="Thumbnail URL"
        value={formData.thumbnail}
        onChange={handleChange("thumbnail")}
        placeholder="http://..."
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700  dark:text-gray-200">
          Category
        </label>
        <select
          value={formData.category}
          onChange={handleChange("category")}
          className="focus:outline-none focus:ring-0 w-full px-4 py-2 rounded-md border bg-white dark:bg-gray-800 border-gray-300 dark:text-white text-sm"
        >
          <option value="" disabled>Select category</option>
          <option value="Development">Development</option>
          <option value="Designing">Designing</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Data Analysis">Data Analysis</option>
          <option value="Academic">Academic</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-900 dark:text-gray-200">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={handleChange("description")}
          rows="5"
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white resize-none"
          placeholder="Minimum 30 characters"
        />
        <p className="text-xs text-gray-400 text-end">
          Min: 30 characters
        </p>
      </div>

      <Button type="submit" disabled={updating || formData.description.length < 30}>
        {updating ? "Updating..." : "Update Course"}
      </Button>
    </form>
  );
};

export default EditCourseDetails;
