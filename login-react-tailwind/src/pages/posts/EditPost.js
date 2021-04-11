import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Alert from '../../components/Alert';

function EditPost({ match }) {
    const { params } = match
    const { post_id } = params
    const [post, setPost] = useState({})
    const cookies = new Cookies();

    useEffect(() => {
        const setHeader = {
            headers: {
                Authorization: 'Bearer ' + cookies.get('ppe-training-fe-token')
            }
        }
        axios.get(`http://happy_eyes.test/api/posts/${post_id}`, { headers: setHeader.headers })
            .then(function (response) {
                setPost(response?.data?.data)
            })
            .catch(function (error) {
            });
    }, [])

    const editPost = async (e) => {
        e.preventDefault();
        const payload = new FormData(e.target);
        console.log('payload', payload);
        const setHeader = {
            headers: {
                Authorization: 'Bearer ' + cookies.get('ppe-training-fe-token')
            }
        }
        axios.post(`http://happy_eyes.test/api/posts/${post_id}`, payload, setHeader)
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
        <form onSubmit={(e) => editPost(e)} className="max-w-sm bg-white rounded-lg shadow-md py-10 px-8">
            <h1 className="text-2xl font-bold w-screen">Edit Post</h1>
            <label className="block text-grey-darker text-sm mb-1 mt-4">
                <span className="block mb-1">Title</span>
                <input className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
                    type="text"
                    name="title"
                    defaultValue={post?.title}
                />
            </label>

            <label className="block text-grey-darker text-sm mb-1 mt-4">
                <span className="block mb-1">Description</span>
                <textarea
                    className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
                    name="description"
                    defaultValue={post?.description}
                ></textarea>

            </label>


            <button type="submit" className="mt-6 btn font-bold w-full">Save</button>
            <input type="hidden" name="_method" value="PUT" />
            <div className="h-px bg-gray-200 mt-8 relative">
                <span className="absolute absolute-x absolute-y bg-white px-3 mt-px text-sm text-gray-400">or</span>
            </div>

        </form>
    )
}
export default EditPost