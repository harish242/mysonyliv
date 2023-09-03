import React, { useState, useEffect } from "react";
import "../../Styles/NavBar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalAcc } from "./ModalNav";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { Table } from "@mantine/core";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const tokenNull = useSelector(
    (state) => state.persisted.localJwtReducer.tokens
  );
  const storePersis = useSelector((state) => state.persisted);
  const userName = useSelector(
    (state) => state.persisted.resetPassword.userdetails.data?.name
  );

  const store = useSelector((state) => state);
  console.log("navbar/14", store);
  const categories = [
    { name: "Movie", type: "movie", class: "class_movie" },
    { name: "Video Song", type: "video song", class: "class_video_song" },
    { name: "Web Series", type: "web series", class: "class_web_series" },
    { name: "Documentary", type: "documentary", class: "class_documentry" },
    { name: "TV Show", type: "tv show", class: "class_tv_show" },
    { name: "Trailer", type: "trailer", class: "class_trailer" },
    { name: "Short Film", type: "short film", class: "class_short_film" },
  ];
  const [activeCategory, setActiveCategory] = useState(categories[0].type);
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [activeKeyword, setActiveKeyword] = useState("romance");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://academics.newtonschool.co/api/v1/ott/show?filter={"type" : "${activeCategory}"}`,
          {
            headers: {
              projectId: "sjp136jp4txm",
            },
          }
        );
        setAllData(response?.data?.data);
        setFilteredData(
          response?.data?.data?.filter((item) =>
            item.keywords.includes(activeKeyword)
          )
        );
        const datai = response.data.data;
        console.log("nav/40", datai);
        if (datai) {
          dispatch({ type: activeCategory, payload: response.data.data });
        }
        console.log("nav/38", activeCategory);
        console.log("nav/37", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    console.log("line 38", allData);
  }, [activeCategory, activeKeyword]);

  const filterByKeyword = (keyword) => {
    setActiveKeyword(keyword);
  };

  const handleCategoryChange = (categoryType) => {
    setActiveCategory(categoryType);
  };

  const handleModalOpen = () => {
    open(); // Open the modal
  };

  const handleLogout = () => {
    dispatch({ type: "NUllIFY_STATE" });
    navigate("/");
  };

  const handleAdd = () => {
    navigate("/additem");
  };

  const handleSignin = () => {
    navigate("/");
  };

  const handleReset = () => {
    navigate("/resetpass");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar_container">
      <div className="navbar_logo">
        <div className="navbar_image">
          <Link to="/home">
            <img
              src="https://images.slivcdn.com/UI_icons/sonyliv_new_revised_header_logo.png?w=40&q=high&fr=webp"
              alt="Logo"
            />
          </Link>
        </div>
        <div
          className="navbar_subscription"
          onClick={() => navigate("/subscription")}
        >
          <button className="navbar_subscription_button">
            Subscribe
            <img
              src="https://images.slivcdn.com/UI_icons/smart_hook/arrow_image.png?h=8&w=4&q=high&fr=webp"
              alt="Arrow"
            />
          </button>
        </div>
        <div className="navbar_logo_seperator_div">
          <div className="navbar_logo_seperator"></div>
        </div>
      </div>
      <div className="navbar_items">
        <div
          className={`navbar_menu_button ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`navbar_dropdown ${menuOpen ? "open" : ""}`}>
          {categories.map((category) => (
            <span key={category.type}>
              <a
                className={`navbar_item check1`}
                onMouseEnter={() => handleCategoryChange(category.type)}
              >
                {category.name}
                {activeCategory === category.type && (
                  <div className={`${category.class}`}>
                    <div className="check2">
                      <Link to={`/data?type=${category.type}`}>
                        <div className="top_left">
                          All {category.name}{" "}
                          <span className="fa_icon">
                            <FaArrowRight />
                          </span>
                        </div>
                      </Link>
                      <div className="top_right">
                        <button
                          className={`top_right_btn ${
                            activeKeyword === "romance" ? "active" : ""
                          }`}
                          onClick={() => filterByKeyword("romance")}
                        >
                          Romance
                        </button>
                        <button
                          className={`top_right_btn ${
                            activeKeyword === "thriller" ? "active" : ""
                          }`}
                          onClick={() => filterByKeyword("thriller")}
                        >
                          Thriller
                        </button>
                        <button
                          className={`top_right_btn ${
                            activeKeyword === "action" ? "active" : ""
                          }`}
                          onClick={() => filterByKeyword("action")}
                        >
                          Action
                        </button>
                        <button
                          className={`top_right_btn ${
                            activeKeyword === "fantasy" ? "active" : ""
                          }`}
                          onClick={() => filterByKeyword("fantasy")}
                        >
                          Fantasy
                        </button>
                      </div>
                    </div>
                    <div className="check_center">
                      <div className="filtered_data">
                        {filteredData?.map((item) => (
                          <div
                            key={item._id}
                            className="filtered_item"
                            onClick={() =>
                              navigate(`/showdetails/${item._id}`)
                            }
                          >
                            <img src={item.thumbnail} alt={item.title} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </a>
            </span>
          ))}
        </div>
      </div>
      <div className="navbar_search">
        <a href="#">
          <AiOutlineSearch />
        </a>
        <div className="navbar_avatar">
          <Modal
            opened={opened}
            onClose={close}
            onClick={close}
            closeOnClickOutside={close}
            title="Authentication"
            centered
            size="25%"
            style={{ backgroundColor: "#B6A3B0", flex: 1 }}
          >
            <Table
              verticalSpacing="xs"
              fontSize="xs"
              horizontalSpacing="xs"
            >
              <thead>
                <tr>
                  {userName ? (
                    <th style={{ color: "#FF9EAA", fontSize: "20px" }}>
                      {userName?.toUpperCase()}
                    </th>
                  ) : (
                    <th>
                      <div onClick={handleSignin}>
                        Sign in a better experience
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to="/subscription">
                      <div>Subscribe Now</div>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div onClick={handleReset}>Settings & update Password</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div onClick={handleAdd}>myList</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div onClick={handleLogout}>LogOut</div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Modal>
          <Group position="center">
            <Button
              onClick={() => open()}
              variant="white"
              color="gray"
              radius="xs"
              size="xs"
            >
              <img
                src="https://images.slivcdn.com/UI_icons/Multiprofile/profile-00.png?h=28&w=28&q=high&fr=webp"
                alt="Profile"
              />
            </Button>
          </Group>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
