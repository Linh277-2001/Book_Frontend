import React from "react"

import FlashDeals from "../components/flashDeals/FlashDeals"
// import TopCate from "../components/top/TopCate"
// import User from "../components/user/User"
import Shop from "../components/shops/Shop"
import Wrapper from "../components/wrapper/Wrapper"

const Pages = ({ productItems, addToCart, shopItems }) => {
  return (
    <>

      <FlashDeals productItems={productItems} addToCart={addToCart} />
      {/* <TopCate /> */}
      <Shop shopItems={shopItems} addToCart={addToCart} />
      <Wrapper />
    </>
  )
}

export default Pages
