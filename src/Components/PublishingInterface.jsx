import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaImage } from "react-icons/fa";

function PublishingInterface() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Title Input */}
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Controls */}
      <div className="flex gap-2 mt-4">
        <button className="border p-2 rounded-lg flex items-center">
          <FaImage className="mr-2" /> Set Cover
        </button>
        <select className="border p-2 rounded-lg">
          <option>Select Group</option>
          <option>Tech</option>
          <option>Design</option>
        </select>
        <select className="border p-2 rounded-lg">
          <option>Create - Post</option>
          <option>Draft</option>
        </select>
      </div>
      
      {/* Editor */}
      <div className="mt-4">
        <ReactQuill value={content} onChange={setContent} className="h-48" />
      </div>
      
      {/* Tags */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">Add or change tags (up to 5)</p>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag..."
            className="border p-2 rounded-lg w-full"
          />
          <button onClick={addTag} className="bg-blue-500 text-white p-2 rounded-lg">
            Add
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-blue-200 px-2 py-1 rounded-lg">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="mt-4 flex justify-end gap-2">
        <button className="border p-2 rounded-lg">Cancel</button>
        <button className="bg-blue-500 text-white p-2 rounded-lg">Publish</button>
      </div>
    </div>
  );
}

export default PublishingInterface; 
