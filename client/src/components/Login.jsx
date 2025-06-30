import React from 'react';

const Login = ({ setShowLogin }) => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [hasLicense, setHasLicense] = React.useState(false);
  const [licenseNumber, setLicenseNumber] = React.useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Example logging all values
    console.log({
      name,
      email,
      password,
      address,
      phone,
      hasLicense,
      licenseNumber: hasLicense ? licenseNumber : "N/A"
    });

    // You can now send this data to your backend
  };

  return (
    <div onClick={() => setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50'>
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-blue-600">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <>
            <div className="w-full">
              <p>Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-600" type="text" required />
            </div>

            <div className="w-full">
              <p>Address</p>
              <input onChange={(e) => setAddress(e.target.value)} value={address} placeholder="type address" className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-600" type="text" required />
            </div>

            <div className="w-full">
              <p>Phone Number</p>
              <input onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="type phone number" className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-600" type="tel" required />
            </div>

            <div className="w-full flex items-center gap-2 mt-2">
              <input type="checkbox" id="licenseCheck" checked={hasLicense} onChange={() => setHasLicense(!hasLicense)} />
              <label htmlFor="licenseCheck">I have a valid license</label>
            </div>

            {hasLicense && (
              <div className="w-full">
                <p>License Number</p>
                <input onChange={(e) => setLicenseNumber(e.target.value)} value={licenseNumber} placeholder="enter license number" className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-600" type="text" required />
              </div>
            )}
          </>
        )}

        <div className="w-full">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-600" type="email" required />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-600" type="password" required />
        </div>

        {state === "register" ? (
          <p>
            Already have account? <span onClick={() => setState("login")} className="text-blue-600 cursor-pointer">click here</span>
          </p>
        ) : (
          <p>
            Create an account? <span onClick={() => setState("register")} className="text-blue-600 cursor-pointer">click here</span>
          </p>
        )}

    
        <button className="bg-blue-600 hover:bg-blue-700 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
