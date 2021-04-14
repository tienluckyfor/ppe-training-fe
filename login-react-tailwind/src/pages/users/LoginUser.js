import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import Cookies from "universal-cookie";

function LoginUser() {
  const cookies = new Cookies();

  const loginUser = async (e) => {
    e.preventDefault();
    const payload = new FormData(e.target);
    console.log("payload", payload);

    axios
      .post("http://happy_eyes.ppe-be.codeby.com/api/user/login", payload)
      .then(function (response) {
        const msg = response.data.message;
        if (response.data.status) {
          Alert({ t: `success`, c: [`login success`] });
          cookies.set("ppe-training-fe-token", response.data.data.token, {
            path: "/",
            expires: new Date(Date.now() + 25920000000),
          });
        } else {
          Alert({ t: `error`, c: [msg] });
        }
        console.log(response);
      })
      .catch(function (error) {});
  };

  return (
    <section className="relative">
      <div className="bg-gray-200 flex justify-center lg:justify-center md:justify-start p-10 h-screen w-screen overflow-hidden">
        <section className="">
          <form
            onSubmit={(e) => loginUser(e)}
            className="bg-white max-w-sm	rounded-lg shadow-md py-8 px-5"
          >
            <h1 className="text-2xl font-bold w-screen">Login</h1>
            <p className="text-gray-400">
              Doesn't have an account yet?
              <Link
                to="RegisterUser"
                className="text-indigo-700 underline ml-1"
              >
                Sign Up
              </Link>
            </p>

            <label className="block text-grey-darker text-sm mb-1 mt-4">
              <span className="">Email Address</span>
              <input
                className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 mt-1 text-grey-darker leading-tight "
                name="email"
                type="email"
                placeholder="you@example.com"
              />
            </label>

            <label className="block text-grey-darker text-sm mb-1 mt-4">
              <div className="flex justify-between mb-1">
                <span className="">Password</span>
                <Link
                  to="ForgotPassword"
                  className="text-indigo-700 underline ml-1"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
                name="password"
                type="password"
                placeholder="Enter 6 character or more"
              />
            </label>

            <div className="mt-4 text-gray-500">
              <input type="checkbox" />
              <label className="ml-2">Remember me</label>
            </div>
            <button type="submit" className="mt-4 btn font-bold w-full">
              LOGIN
            </button>
            <div className="h-px bg-gray-200 mt-8 relative">
              <span className="absolute absolute-x absolute-y bg-white px-3 mt-px text-sm text-gray-400">
                or login with
              </span>
            </div>
            <div className="flex space-x-3 mt-5">
              <button
                type="button"
                className="flex item-center px-4 py-2 rounded font-bold w-full text-red-600 border border-red-600"
              >
                <img
                  className="w-5 mr-4"
                  src=".\assets\images\google-icon.png"
                />
                Google
              </button>
              <button
                type="button"
                className="flex item-center px-4 py-2 rounded font-bold w-full text-blue-600 border border-blue-600"
              >
                <img
                  className="w-7 mr-2"
                  src=".\assets\images\facebook-icon1.png"
                />
                Facebook
              </button>
            </div>
          </form>

          <section className=""></section>
        </section>
        <section className="hidden md:block">
          <img
            className="max-w-lg ml-20 mt-20"
            src=".\assets\images\bg-login\undraw_book_lover_mkck-1.png"
          />
        </section>
      </div>
    </section>
  );
}

export default LoginUser;
