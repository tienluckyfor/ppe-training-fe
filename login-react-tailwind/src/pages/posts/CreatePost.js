import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Alert from '../../components/Alert';

function CreatePost() {

    const cookies = new Cookies();

    const createPost = async (e) => {
        e.preventDefault();
        const payload = new FormData(e.target);
        console.log('payload', payload);

        const setHeader = {
            headers: {
                Authorization: 'Bearer ' + cookies.get('ppe-training-fe-token')
            }
        }
        axios.post('http://happy_eyes.test/api/posts', payload, setHeader)
            .then(function (response) {
                if (response.data.status) {
                    Alert({ t: `success`, c: [`Create post success`] });
                    // cookies.set('ppe-training-fe-token', response.data.data.token, { path: '/', expires: new Date(Date.now() + 25920000000) });
                } else {
                    Alert({ t: `error`, c: [response.data.message] });
                }
                console.log(response);
            })
            .catch(function (error) {
                /* const err = error.response.data.message
                Alert({t: 'error', c: [err]}) */
                //console.log(error);
            });
    }

    return (
        <form onSubmit={(e) => createPost(e)} className="max-w-sm bg-white rounded-lg shadow-md py-10 px-8">
            <h1 className="text-2xl font-bold w-screen">Create Post</h1>
            <label className="block text-grey-darker text-sm mb-1 mt-4">
                <span className="block mb-1">Title</span>
                <input className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
                    type="text"
                    name="title" />
            </label>

            <label className="block text-grey-darker text-sm mb-1 mt-4">
                <span className="block mb-1">Description</span>
                <textarea className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
                    name="description"></textarea>

            </label>


            <button type="submit" className="mt-6 btn font-bold w-full">Create</button>

            <div className="h-px bg-gray-200 mt-8 relative">
                <span className="absolute absolute-x absolute-y bg-white px-3 mt-px text-sm text-gray-400">or</span>
            </div>

        </form>
    )
}
export default CreatePost