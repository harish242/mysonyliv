import React, { useState, useEffect } from "react";
import "../../Styles/NavBar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalAcc } from "./ModalNav";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { Table } from "@mantine/core";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const tokenNull=useSelector(state=>state.persisted.localJwtReducer.tokens)
  const storePersis=useSelector(state=>state.persisted)



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
  const handleLogout=()=>{
    
        dispatch({type:'NUllIFY_STATE'}),
        navigate('/')
        
  }
  const handleAdd=()=>{
    navigate('/additem')
  }
  const handleSignin=()=>{
    navigate('/')
  }
  const handleReset=()=>{
    navigate('/resetpass')
  }
  return (
    <div className="navbar_container">
      <div className="navbar_logo">
        <div className="navbar_image">
          <img src="https://images.slivcdn.com/UI_icons/sonyliv_new_revised_header_logo.png?w=40&q=high&fr=webp" />
        </div>
        <div className="navbar_subscription" onClick={()=>navigate('/subscription')}>
          <button className="navbar_subscription_button" >
            Subscribe
            <img src="https://images.slivcdn.com/UI_icons/smart_hook/arrow_image.png?h=8&w=4&q=high&fr=webp" />
          </button>
        </div>
        <div className="navbar_logo_seperator_div">
          <div className="navbar_logo_seperator"></div>
        </div>
      </div>
      <div className="navbar_items">
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
                          onClick={() => navigate(`/showdetails/${item._id}`)}
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
      <div className="navbar_search">
        {/* <div>myList</div> */}
        <a href="#">
          <AiOutlineSearch />
        </a>

        <div className="navbar_avatar">
          {/* <img src='https://images.slivcdn.com/UI_icons/Multiprofile/profile-00.png?h=28&w=28&q=high&fr=webp' /> */}
          <Modal
            opened={opened}
            onClose={close}
            onClick={close}
            closeOnClickOutside={close}

            title="Authentication"
            centered
            size="25%"
            // opacity={0.85}
            style={{ backgroundColor: "#B6A3B0", flex: 1 }}
          >
            {/* Modal content */}
            <Table verticalSpacing="xs" fontSize="xs" horizontalSpacing="xs">
              {/* {...rows} */}
              <thead>
                <tr onClick={handleSignin}>
                  {/* <Link to="/"> */}
                  {/* <div onClick={handleSignin}> */}
                  <th >Sign in a better experience</th>

                  {/* </div> */}
                  {/* </Link> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Subscribe Now</td>
                </tr>
                <tr>
                  <td>Activate TV</td>
                </tr>
                <tr onClick={handleReset}>
                  {/* <div onClick={handleReset}> */}
                  <td >Settings &updatePassword</td>

                  {/* </div> */}
                </tr>
                <tr>
                  <td>Contact Us</td>
                </tr>
                <tr>
                  <td>Chat with us on WhatsApp</td>
                </tr>
                <tr onClick={handleAdd}>
                  {/* <div onClick={handleAdd}> */}
                  <td >myList</td>

                  {/* </div> */}
                    
                </tr>
                <tr onClick={handleLogout}>
                  {/* <div onClick={handleLogout}> */}
                  <td >LogOut</td>

                  {/* </div> */}
                </tr>
              </tbody>
            </Table>
          </Modal>
          <Group position="center">
            <Button
              onClick={()=>open()}
              variant="white"
              color="gray"
              radius="xs"
              size="xs"
            >
              <img src="https://images.slivcdn.com/UI_icons/Multiprofile/profile-00.png?h=28&w=28&q=high&fr=webp" />
            </Button>
          </Group>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
