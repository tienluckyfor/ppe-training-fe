import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Alert from '../../components/Alert';
import moment from 'moment'

function ListPost() {

    const cookies = new Cookies();
    const [posts, setPosts] = useState([])

    useEffect(() => {
        onLoadPost()
    }, [])

    const setHeader = {
        headers: {
            Authorization: 'Bearer ' + cookies.get('ppe-training-fe-token')
        }
    }
    const onLoadPost = () => {
        axios.get('http://happy_eyes.test/api/posts', { headers: setHeader.headers })
            .then(function (response) {
                setPosts(response?.data?.data)
            })
            .catch(function (error) {
            });

    }

    const onDelete = (post) => {
        if (window.confirm('Are you sure, want delete it?')) {
            axios.delete(`http://happy_eyes.test/api/posts/${post.id}`, setHeader)
                .then(function (response) {
                    if (response.data.status) {
                        onLoadPost()
                        // Alert({ t: `success`, c: [`Delete post success`] });
                    } else {
                        Alert({ t: `error`, c: [response.data.message] });
                    }
                    console.log(response);
                })
                .catch(function (error) {
                });
        }
    }

    return (
        <div className="mx-auto max-w-sm">
            <nav className="uppercase flex space-x-4 justify-center py-3">
                <Link className="text-blue-700" to={`/ListPost?me`}>My posts</Link>
                <Link to={`/ListPost?all`}>All posts</Link>
                <Link to={`/CreatePost`}>Create</Link>
            </nav>
            <ul className="">
                {posts.map((post, key) =>
                    <li className="py-2 my-2 border-t ">
                        <Link className="" to={`/EditPost/${post.id}`}>
                            <p className="text-gray-400">Create by: Phep Mau</p>
                            <h3 className="font-semibold">{post.title}</h3>
                            <p>{post.description}</p>
                            <p className="text-gray-400">{moment(post.created_at).fromNow()}</p>
                        </Link>
                        <button
                            onClick={(e) => onDelete(post)}
                            className="btn mt-3">Delete</button>
                    </li>
                )}
            </ul>
        </div>
    )
}
export default ListPost