import ItemCount from "../ItemCount/ItemCount"
import Flex from "../Flex/Flex"

const ItemDetail = ({title, stock, price, detail, imgurl, onAddToCart}) => {

  return(
    <Flex>
      <div className="card mx-2 py-2 my-2 px-2">
          <img height="250px" src={imgurl} alt={title} />
          <h6>{title}</h6>
          <h6>{price}</h6>
          <h6>{detail}</h6>
          <ItemCount onAddToCart={onAddToCart} stock={stock}/>
      </div>
    </Flex>
  )
}

export default ItemDetail