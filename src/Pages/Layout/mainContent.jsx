import { useState } from "react";
import { Outlet } from "react-router-dom";
import InputField from "../../Components/inputField";
import Btc from "../../assets/btc.jpg";
import Seo from "../../assets/seo.jpg";
import One from "../../assets/one.jpg";
import Design from "../../assets/Design.jpg";
import Button from "../../Components/button";

const MainContent = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

  const handleCreatePost = () => {
    console.log("Create Post button clicked!");
  };

  const mockData = [
    {
      id: 1,
      title:
        "Bitcoin has tumbled from its record high of $58,000 after words from three wise men and ...",
      tags: ["finance", "bitcoin", "crypto"],
      details: {
        author: "Pavel Gway",
        time: "3 weeks ago",
        views: "651,324 Views",
        likes: "36,545 Likes",
        comments: "56 comments",
      },
      image: Btc,
    },
    {
      id: 2,
      title:
        "The 4-step SEO framework that led to a 1000% increase. Let's talk blogging and SEO...",
      tags: ["seo", "blogging", "traffic"],
      details: {
        author: "AR Jakir",
        time: "3 days ago",
        views: "244,564 Views",
        likes: "10,920 Likes",
        comments: "184 comments",
      },
      image: Seo,
    },
    {
      id: 3,
      title:
        "OnePay- Online payment Web App- online digital Payment Download it from Uihut.com",
      tags: ["Payment", "webapp", "uikit"],
      details: {
        author: "Mansurul Haque",
        time: "1 week ago",
        views: "601,066 Views",
        likes: "24,753 Likes",
        comments: "209 comments",
      },
      image: One,
    },
    {
      id: 4,
      title:
        "Designing User-interfaces and how i was able to sell over 1800 copies in few months...",
      tags: ["User", "Design", "Sold"],
      details: {
        author: "Mr Chidi",
        time: "3 weeks ago",
        views: "121,066 Views",
        likes: "4,753 Likes",
        comments: "129 comments",
      },
      image: Design,
    },
  ];

  return (
    <div className="main-content w-full ml-16 md:ml-56 mr-16 md:mr-72 p-4 flex-1">
      {/* Input Field and Button */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex-grow">
            <InputField
              type="text"
              placeholder="Let's share what's going on your mind..."
              value={inputValue}
              onChange={handleInputChange}
              backgroundColor="#f8f8f8"
              style={{
                height: "48px",
                fontSize: "15px",
                width: "100%",
                borderRadius: "4px",
                paddingLeft: "24px",
                paddingRight: "24px",
              }}
            />
          </div>
          <Button
            backgroundColor="bg-[#FF4500]/60"
            onClick={handleCreatePost}
            style={{
              height: "40px",
              padding: "0 24px",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Create Post
          </Button>
        </div>
      </div>

      <Outlet />

      {/* Posts */}
      {mockData.map((item) => (
        <div
          key={item.id}
          className="bg-white flex rounded-xl mt-5 p-4 h-[200px]"
        >
          {/* Image */}
          <div className="w-38 h-38 flex-shrink-0 mr-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Title */}
            <h2 className="text-lg font-semibold mb-2 pt-2">{item.title}</h2>

            {/* Tags */}
            <div className="flex space-x-2 mb-4">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded ml-10 mt-4"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author, Time, Views, Likes, Comments */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold pt-4 pl-12">
                  {item.details.author}
                </p>
                <p className="text-xs text-gray-500 pl-12">
                  {item.details.time}
                </p>
              </div>
              <div className="flex space-x-4">
                <p className="text-sm text-gray-600 pr-6">
                  {item.details.views}
                </p>
                <p className="text-sm text-gray-600 pr-6">
                  {item.details.likes}
                </p>
                <p className="text-sm text-gray-600 pr-6">
                  {item.details.comments}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Remaining empty divs */}
      <div className="bg-white flex justify-center h-[250px] rounded-xl mt-5"></div>
    </div>
  );
};

export default MainContent;
