import { useState, useEffect, useContext} from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import {obtenerProducto} from "../../services/mockService"
import { useParams } from "react-router-dom";
import { cartContext } from "../../storage/cartContext";

const ItemDetailContainer = () => {
    let params = useParams();
    const [producto, setProducto] = useState([{title: "loading"}])
    const {addCart} = useContext(cartContext)

    function handleAddToCart (count){
      addCart(producto)
    }
  
    useEffect(() => {
    obtenerProducto(params.itemid).then((res) =>{
        setProducto(res)
      })
      .catch((error)=> alert(error));
    },[params])
  
    return (
          <ItemDetail 
          onAddToCart={handleAddToCart} 
          title={producto.title}
          stock={producto.stock}
          price={producto.price}
          detail={producto.detail}
          imgurl={producto.imgurl}
          />
    )

}

export default ItemDetailContainer