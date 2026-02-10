import { useState } from "react";
import AdminImage from "../images/Admin.png";
import { useAdminLogin } from "../hooks/server/mutations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync, isPending } = useAdminLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await mutateAsync({ email, password });
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left image section */}
      <div className="hidden md:flex w-1/2 p-5">
        <img
          src={AdminImage}
          alt="Admin Login Visual"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Right form section */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 md:px-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl text-center font-semibold text-slate-900 mb-8">
            Admin Login
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                className="w-full rounded-md border border-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                className="w-full rounded-md border border-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-slate-900 py-3 text-m font-medium text-white hover:bg-slate-800 transition disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
