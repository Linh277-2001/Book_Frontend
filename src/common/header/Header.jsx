import React from "react"
import "./Header.css"
import Search from "./Search"

const Header = ({ CartItem }) => {
  return (
    <>
      <Search CartItem={CartItem} />
    </>
  )
}

export default Header
