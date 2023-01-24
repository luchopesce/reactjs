import ItemCount from "../ItemCount/ItemCount"
import Flex from "../Flex/Flex"
import { Link } from "react-router-dom"
import { cartContext } from "../../storage/cartContext";
import { useContext } from "react";

const ItemDetail = ({id, title, stock, price, detail, imgurl, onAddToCart}) => {
  const {cart} = useContext(cartContext)

  const searchItemID = cart.find((item) => item.id === id)

  return(
    <Flex>
      <div className="card mx-2 py-2 my-2 px-2">
          <img height="250px" src={imgurl} alt={title} />
          <h6>{title}</h6>
          <h6>{price}</h6>
          <h6>{detail}</h6>
          {searchItemID ? <Link to="/cart" className="btn btn-primary" >Ir al carro </Link> :
          <ItemCount onAddToCart={onAddToCart} stock={stock} itemid={id}/>
          }
      </div>
    </Flex>
  )
}

export default ItemDetail