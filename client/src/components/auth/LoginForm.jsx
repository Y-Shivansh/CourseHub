import { useState } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import Input from "../common/Input"
import Button from "../common/Button"
import { publicApi } from "../../services/axios.config"
import Loader from '../common/Loader';
import { toast } from "react-toastify";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault(); // form page reload hone se bachega.
    try {
      const res = await publicApi.post("/user/signin", { email, password });
      const token = res.data.token;

      if (token) {
        localStorage.setItem("authToken", token);
        toast.success("Logged in successfully")
        // localStorage.setItem("user", JSON.stringify(res.data.user)) 
        // commented out as not sending it back from backend.
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login Failed");
      setError(error?.response?.data?.message || "Login Failed");
    }finally{
      setLoading(false);
    }

  }
  if(loading) return <Loader/>


  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md mx-auto border border-gray-200 rounded-2xl px-6 py-8 dark:bg-secondary-light bg-background-light  shadow-sm transition"
    >
      <div className="grid gap-5">
        <h1 className="text-2xl text-center font-semibold text-text-light ">
          Login to CourseHub
        </h1>

        <Input
          label={"Email"}
          name={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Enter your email"}
          required
          className="bg-background-light border-gray-300"
          applyDark={false}
          labelDark={false}
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
            className="pr-10 bg-background-light border-gray-300"
            applyDark={false}
            labelDark={false}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] cursor-pointer text-gray-500 "
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <Button type="submit">Login</Button>
      </div>

      {/* :Error Side: */}
      {error && <p className=' text-red-500 text-center text-sm mt-4'>{error}</p>}

      {/* Signup line */}
      <p className="text-sm text-center text-text-muted mt-6">
        New here?{" "}
        <Link
          to="/signup"
          className="text-primary-light  hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>

  )
}

export default LoginForm
