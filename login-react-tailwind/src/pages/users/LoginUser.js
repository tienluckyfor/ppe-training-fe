import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert'
import Cookies from 'universal-cookie';

function LoginUser() {
    const cookies = new Cookies();


    const [message, setMessage] = useState(null)
    const loginUser = async (e) => {
        e.preventDefault()
        const payload = new FormData(e.target);
        axios.post('http://happy_eyes.test/api/user/login', payload)
            .then(function (response) {
                if (response.data.status) {
                    Alert({ t: `Success`, c: [`Login success`] })
                    cookies.set('ppe-training-fe-token', response.data.data.token, { path: '/', expires: new Date(Date.now() + 25920000000) });
                } else
                    Alert({ t: `Error`, c: [response.data.message] })
                // setMessage(`Register user success`)
                console.log('response', response);
            })
            .catch(function (error) {
                const err = error.response.data.message
                // setMessage(err)
                Alert({ t: `Err`, c: [err] })
            });
    }
    return (
        <section className="relative">
            {/* <Alert message={'ppe'} /> */}
            <div className="bg-gray-200 flex justify-center lg:justify-center md:justify-start p-0 md:p-10 overflow-x-hidden">
                <form onSubmit={(e) => loginUser(e)} className="max-w-sm bg-white rounded-lg shadow-md py-10 px-8">
                    <h1 className="text-2xl font-bold w-screen">Login</h1>
                    <p className="text-gray-400 text-xl mt-5">
                        Let's get you on board
                    </p>

                    <label className="block text-grey-darker text-sm mb-1 mt-4" >
                        <span className="block mb-1">Email Address</span>
                        <input className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
                            type="email"
                            name="email"
                            placeholder="you@example.com" />
                    </label>

                    <label className="block text-grey-darker text-sm mb-1  mt-4" >
                        <span className="block mb-1">Password</span>
                        <input className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
                            name="password"
                            type="password"
                            placeholder="Enter 6 character or more" />
                    </label>

                    <button type="submit" className="mt-6 btn font-bold w-full">Login</button>
                    <div className="h-px bg-gray-200 mt-8 relative">
                        <span className="absolute absolute-x absolute-y bg-white px-3 mt-px text-sm text-gray-400">or</span>
                    </div>

                    <Link to="/RegisterUser" className="btn block mt-6 w-full">Register</Link>
                    <div className="flex space-x-3 mt-5">
                        <button className="flex item-center px-4 py-2 rounded font-bold w-full text-red-600 border border-red-600">
                            <img className="w-5 mr-4" src=".\assets\images\google-icon.png" />
            Google
          </button>
                        <button className="flex item-center px-4 py-2 rounded font-bold w-full text-blue-600 border border-blue-600">
                            <img className="w-7 mr-2" src=".\assets\images\facebook-icon1.png" />
            Facebook
          </button>
                    </div>
                    <p className="text-gray-400 text-center mt-5">
                        Already have an account?
          <a className="text-indigo-700 underline ml-1">Sign In</a>
                    </p>
                </form>
                <section className="hidden md:block">
                    <img className="max-w-lg ml-20 mt-20" src=".\assets\images\bg-login\reading-book.png" />
                </section>
            </div>
        </section>

    );
}

export default LoginUser;
