import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../components/assets/images/book.png";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Search = ({ CartItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      history.push(`/search/${searchTerm}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });

  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <Link to='/'>
              <img src={logo} alt='' style={{ width: 60 }} />
            </Link>
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input
              type='text'
              placeholder='Search'
              style={{ border: "none" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={handleKeyPress} // Xử lý khi người dùng nhấn phím "Enter"
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>

          <div className='icon f_flex width'>
            <Link to="/user">
              <i className='fa fa-user icon-circle'></i>
            </Link>
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "0" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
