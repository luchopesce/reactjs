import { useState, useEffect} from "react";
import Item from "../Item/Item";
import Flex from "../Flex/Flex"
import "./itemlistcontainer.css"
import obtenerListaProductos from "../../services/mockService";

const ItemListContainer = () => {

  const [productos, setProductos] = useState([])

  useEffect(() => {
    obtenerListaProductos().then((res) =>{
      setProductos(res)
    })
    .catch((error)=> alert(error));
    return()=> console.log("Desmontamos ITC")
  },[])


  return (
    <div>
      <Flex>
        {productos.map((items) => <Item key={items.id} item={items}/>)}
      </Flex>
    </div>
  )
}

export default ItemListContainer