import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../slices/posts";

function CreatePost() {
  const dispatch = useDispatch();
  return (
    <form
      onSubmit={(e) => dispatch(createPost(e))}
      className="max-w-sm bg-white rounded-lg shadow-md py-10 px-8"
    >
      <h1 className="text-2xl font-bold w-screen">Create Post</h1>
      <label className="block text-grey-darker text-sm mb-1 mt-4">
        <span className="block mb-1">Title</span>
        <input
          className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
          type="text"
          name="title"
        />
      </label>

      <label className="block text-grey-darker text-sm mb-1 mt-4">
        <span className="block mb-1">Description</span>
        <textarea
          className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
          name="description"
        ></textarea>
      </label>
      <button type="submit" className="mt-6 btn font-bold w-full">
        Create
      </button>
    </form>
  );
}
export default CreatePost;
