import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import InputField from "../../Components/inputField";
import Btc from "../../assets/Btc.jpg";
import Seo from "../../assets/Seo.jpg";
import One from "../../assets/One.jpg";
import Design from "../../assets/Design.jpg";
import Button from "../../Components/button";
import { PublishContext } from "../../context/publishContext";
import { ThemeContext } from "../../context/themeContext";

const MainContent = () => {
  const [inputValue, setInputValue] = useState("");
  const { openPublisher } = useContext(PublishContext);
  const { themeColors } = useContext(ThemeContext);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

  const handleCreatePost = () => {
    openPublisher();
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
    <div
      className="main-content w-full ml-16 md:ml-56 mr-16 md:mr-72 p-4 flex-1"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.textColor,
      }}
    >
      {/* Input Field and Button */}
      <div
        className="p-4 rounded-xl shadow-sm"
        style={{
          backgroundColor: themeColors.inputBgPrimary,
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex-grow">
            <InputField
              onFocus={handleCreatePost}
              type="text"
              placeholder="Let's share what's going on your mind..."
              value={inputValue}
              onChange={handleInputChange}
              backgroundColor={themeColors.inputBgPrimary}
              style={{
                height: "48px",
                fontSize: "15px",
                width: "100%",
                borderRadius: "4px",
                paddingLeft: "24px",
                paddingRight: "24px",
                color: themeColors.textColor,
              }}
            />
          </div>
          <Button onClick={handleCreatePost} text="Post">
            Create Post
          </Button>
        </div>
      </div>

      <Outlet />

      {/* Posts */}
      {mockData.map((item) => (
        <div
          key={item.id}
          className="flex rounded-xl mt-5 p-4 h-[200px]"
          style={{
            backgroundColor: themeColors.inputBgPrimary,
          }}
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
            <h2
              className="text-lg font-semibold mb-2 pt-2"
              style={{ color: themeColors.textColor }}
            >
              {item.title}
            </h2>

            {/* Tags */}
            <div className="flex space-x-2 mb-4">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm px-3 py-1 rounded ml-10 mt-4"
                  style={{
                    backgroundColor: themeColors.secondaryColor,
                    color: themeColors.textColor,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author, Time, Views, Likes, Comments */}
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-semibold pt-4 pl-12"
                  style={{ color: themeColors.textColor }}
                >
                  {item.details.author}
                </p>
                <p
                  className="text-xs pl-12"
                  style={{ color: themeColors.secondaryColor }}
                >
                  {item.details.time}
                </p>
              </div>
              <div className="flex space-x-4">
                <p
                  className="text-sm pr-6"
                  style={{ color: themeColors.secondaryColor }}
                >
                  {item.details.views}
                </p>
                <p
                  className="text-sm pr-6"
                  style={{ color: themeColors.secondaryColor }}
                >
                  {item.details.likes}
                </p>
                <p
                  className="text-sm pr-6"
                  style={{ color: themeColors.secondaryColor }}
                >
                  {item.details.comments}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Remaining empty divs */}
      <div
        className="flex justify-center h-[250px] rounded-xl mt-5"
        style={{
          backgroundColor: themeColors.inputBgPrimary,
        }}
      ></div>
    </div>
  );
};

export default MainContent;
