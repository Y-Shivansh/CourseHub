import { useState } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import Input from "../common/Input"
import Button from "../common/Button"
import { publicApi } from "../../services/axios.config"


const SignupForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await publicApi.post("/user/signup", { name, email, phone, password, role });
      const token = res.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Signup Failed", error);
      setError(error?.response?.data?.message || "Signup Failed")

    }
  }

  return (
    <form onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700 rounded-lg px-6 py-8 bg-secondary-light dark:bg-secondary-dark shadow-sm transition"
    >
      <div className="grid gap-5">
        <h1 className="text-2xl text-center font-semibold text-text-light dark:text-text-dark">
          Register to CourseHub
        </h1>

        <Input
          label={"Name"}
          name={"name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={"Enter your name"}
          required
          className="bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600"
        />

        <Input
          label={"Phone"}
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={"Enter your phone number"}
          required
          className="bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600"
        />

        {/* Select Dropdown */}
        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="text-text-light dark:text-text-dark">
            Select Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="focus:outline-none focus:ring-0 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-sm"
          >
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
          className="bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600"
        />

        <div className="relative">
          <Input
            label={"Password"}
            type={showPassword ? "text" : "password"}
            name={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Enter password"}
            required
            className="pr-10 bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] cursor-pointer text-gray-500 dark:text-gray-300"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <Button type="submit">Signup</Button>
      </div>

      {/* :Error Side: */}
      {error && <p className=' text-red-500 text-center text-sm mt-4'>{error}</p>}

      {/* Signup line */}
      <p className="text-sm text-center text-text-muted mt-6">
        Already Registered?{" "}
        <Link
          to="/"
          className="text-primary-light dark:text-primary-dark hover:underline"
        >
          Login
        </Link>
      </p>
    </form>

  )
}

export default SignupForm
