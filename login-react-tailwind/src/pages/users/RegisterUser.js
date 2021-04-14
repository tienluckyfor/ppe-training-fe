import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import Cookies from "universal-cookie";

function RegisterUser() {
  const cookies = new Cookies();

  const createUser = async (e) => {
    e.preventDefault();
    const payload = new FormData(e.target);
    console.log("payload", payload);

    axios
      .post(`${process.env.REACT_APP_API_URL}/user/register`, payload)
      .then(function (response) {
        if (response.data.status) {
          Alert({ t: `success`, c: [`Register user success`] });
          cookies.set("ppe-training-fe-token", response.data.data.token, {
            path: "/",
            expires: new Date(Date.now() + 25920000000),
          });
        } else {
          Alert({ t: `error`, c: [response.data.message] });
        }
        console.log(response);
      })
      .catch(function (error) {
        const err = error.response.data.message;
        Alert({ t: "error", c: [err] });
      });
  };

  const generateUrl = (platform) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth-generate-url`, { params: { platform } })
      .then(function (response) {
        window.location.assign(response?.data?.data)
      })
      .catch(function (error) {
        const err = error.response.data.message;
        Alert({ t: "error", c: [err] });
      });
  }

  return (
    <section className="relative">
      <div className="bg-gray-200 flex justify-center lg:justify-center md:justify-start p-10 overflow-x-hidden">
        <form
          onSubmit={(e) => createUser(e)}
          className="max-w-sm bg-white rounded-lg shadow-md py-10 px-8"
        >
          <h1 className="text-2xl font-bold w-screen">Register</h1>
          <p className="text-gray-400">
            Already have an account?
            <Link to="/LoginUser" className="text-indigo-700 underline ml-1">
              Sign In
            </Link>
          </p>

          <label className="block text-grey-darker text-sm mb-1 mt-4">
            <span className="block mb-1">Full Name</span>
            <input
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
              type="text"
              name="name"
              placeholder="Ex: Nguyen Van A"
            />
          </label>

          <label className="block text-grey-darker text-sm mb-1 mt-4">
            <span className="block mb-1">Email Address</span>
            <input
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
              type="email"
              name="email"
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-grey-darker text-sm mb-1 mt-4">
            <span className="block mb-1">Password</span>
            <input
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
              type="password"
              name="password"
              placeholder="Enter 6 character or more"
            />
          </label>

          <button type="submit" className="mt-6 btn font-bold w-full">
            REGISTER
          </button>

          <div className="h-px bg-gray-200 mt-8 relative">
            <span className="absolute absolute-x absolute-y bg-white px-3 mt-px text-sm text-gray-400">
              or
            </span>
          </div>
          <div className="flex space-x-3 mt-5">
            <button
              onClick={(e) => generateUrl(`google`)}
              type="button"
              className="flex item-center px-4 py-2 rounded font-bold w-full text-red-600 border border-red-600"
            >
              <img className="w-5 mr-4" src=".\assets\images\google-icon.png" />
              Google
            </button>
            <button
              onClick={(e) => generateUrl(`facebook`)}
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
        <section className="hidden md:block">
          <img
            className="max-w-lg ml-20 mt-20"
            src=".\assets\images\bg-login\reading-book.png"
          />
        </section>
      </div>
    </section>
  );
}

export default RegisterUser;
