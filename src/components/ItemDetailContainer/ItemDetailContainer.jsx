import { useState, useEffect} from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import Flex from "../Flex/Flex";
import {obtenerProducto} from "../../services/mockService"

const ItemDetailContainer = () => {

    const [producto, setProducto] = useState([])

    useEffect(() => {
    obtenerProducto().then((res) =>{
        setProducto(res)
      })
      .catch((error)=> alert(error));
    },[])
  
    return (
      <div>
        <Flex>
          <ItemDetail key={producto.id} producto={producto}/>
        </Flex>
      </div>
    )

}

export default ItemDetailContainer