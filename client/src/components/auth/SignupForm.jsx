import { useState } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import Input from "../common/Input"
import Button from "../common/Button"
import { publicApi } from "../../services/axios.config"
import Loader from '../common/Loader';
import { toast } from 'react-toastify';
import { getUserRoleFromToken } from '../../utils/getUserRoleFromToken';



const SignupForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await publicApi.post("/user/signup", { name, email, phone, password, role });
      const token = res.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
        const role = getUserRoleFromToken();
        toast.success("SignUp Successful");
        { role === 'student' ? navigate("/dashboard-student") : navigate("/dashboard-teacher") };
      }
    } catch (error) {
      toast.error("Signup Failed")
      console.error("Signup Failed", error);
      setError(error?.response?.data?.message || "Signup Failed")
    }
    finally {
      setLoading(false);
    }
  }
  if (loading) return <Loader />

  return (
    <form onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto border border-gray-200 rounded-2xl px-4 sm:px-6 py-6 sm:py-8 dark:bg-secondary-light bg-background-light shadow-sm transition"
    >
      <div className="grid gap-4 sm:gap-5">
        <h1 className="text-xl sm:text-2xl text-center font-semibold text-text-light">
          Register to CourseHub
        </h1>

        <Input
          label={"Name"}
          name={"name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={"Enter your name"}
          required
          className="bg-background-light  border-gray-300"
          applyDark={false}
          labelDark={false}
        />

        <Input
          label={"Phone"}
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={"Enter your phone number"}
          required
          className="bg-background-light  border-gray-300"
          applyDark={false}
          labelDark={false}
        />

        {/* Select Dropdown */}
        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="text-text-light">
            Select Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="focus:outline-none focus:ring-0 w-full px-4 py-2 rounded-md border border-gray-300  bg-background-light  text-text-light text-sm"
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <Input
          label={"Email"}
          name={"email"}
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Enter your email"}
          required
          className="bg-background-light  border-gray-300"
          applyDark={false}
          labelDark={false}
        />
        <Input
          label={"Password"}
          type={"password"}
          name={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"Enter password"}
          required
          className="bg-background-light  border-gray-300"
          applyDark={false}
          labelDark={false}
          isPassword={true}
        />

        <Button type="submit">Signup</Button>
      </div>

      {/* :Error Side: */}
      {error && <p className='text-red-500 text-center text-xs sm:text-sm mt-3 sm:mt-4'>{error}</p>}

      {/* Signup line */}
      <p className="text-xs sm:text-sm text-center text-text-muted mt-4 sm:mt-6">
        Already Registered?{" "}
        <Link
          to="/"
          className="text-primary-light dark:text-primary-dark hover:underline"
        >
          Login
        </Link>
      </p>
      <div className="my-4 text-center text-sm text-gray-400"> - or - </div>
      <OAuthButton />
    </form>
  )
}

export default SignupForm
