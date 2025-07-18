import React from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === "signup" && password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const payload =
        state === "signup"
          ? {
              name,
              email,
              password,
              passwordConfirm,
              preferences: {
                price: 0,
                engineCC: 0,
                weight: 0,
              },
            }
          : { email, password };

      const { data } = await axios.post(`/api/v1/users/${state}`, payload);

      if (data.status === "success") {
        setToken(data.token, data.data.user); // ✅ Save token and user
        setShowLogin(false);
        navigate('/');
        toast.success(`${state === "signup" ? "Signup" : "Login"} successful!`);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-blue-600">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "signup" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Type name"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-600"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Type email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-600"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Type password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-600"
            type="password"
            required
          />
        </div>

        {state === "signup" && (
          <div className="w-full">
            <p>Confirm Password</p>
            <input
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
              placeholder="Confirm password"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-600"
              type="password"
              required
            />
          </div>
        )}

        {state === "signup" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("login")} className="text-blue-600 cursor-pointer">
              Click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span onClick={() => setState("signup")} className="text-blue-600 cursor-pointer">
              Click here
            </span>
          </p>
        )}

        <button className="bg-blue-600 hover:bg-blue-700 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "signup" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
