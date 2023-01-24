import { useState, useEffect, useContext} from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import {obtenerProducto} from "../../services/mockService"
import { useParams } from "react-router-dom";
import { cartContext } from "../../storage/cartContext";
import Loader from "../Loader/Loader";
import Flex from "../Flex/Flex";

const ItemDetailContainer = () => {
    let params = useParams();
    const [producto, setProducto] = useState([])
    const {addItemCart, removeItemCart, clearCart} = useContext(cartContext)
    const [isLoading, setLoading] = useState(true)
    const [isInCart, setIsInCart] = useState(false)

    function handleAddToCart (count){
      addItemCart(
        {...producto, count: count}
        )
      setIsInCart(true)
    }

    function handleRemoveItem (countDelete){
      removeItemCart(producto.id, countDelete)
    }

    function handleClearCart (){
      clearCart()
    }
  
    useEffect(() => {
    obtenerProducto(params.itemid).then((res) =>{
        setProducto(res)
      })
      .catch((error)=> alert(error))
      .finally(()=>setLoading(false))
    },[params])
  
    return (
      <>
      {
        isLoading ? 
        (<Flex><Loader/></Flex>) : (
          <ItemDetail
          isInCart = {isInCart}
          onClearCart = {handleClearCart}
          onRemoveItem={handleRemoveItem}
          onAddToCart={handleAddToCart} 
          id={producto.id}
          title={producto.title}
          stock={producto.stock}
          price={producto.price}
          detail={producto.detail}
          imgurl={producto.imgurl}
          />
          )
        }
          </>
    )

}

export default ItemDetailContainer