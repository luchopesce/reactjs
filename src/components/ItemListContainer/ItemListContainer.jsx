import { useState, useEffect} from "react";
import ItemList from "../ItemList/ItemList";
import Flex from "../Flex/Flex"
import "./itemlistcontainer.css"
import obtenerListaProductos, { filtrarProducto } from "../../services/mockService";
import { useParams } from "react-router";

const ItemListContainer = () => {
  let {itemcategoria} = useParams();
  console.log(itemcategoria)

  const [productos, setProductos] = useState([])

  useEffect(() => {
    if(!itemcategoria){
      obtenerListaProductos().then((res) =>{
        setProductos(res)
      })
      .catch((error)=> alert(error));
    }
    else{
      filtrarProducto(itemcategoria).then((res) =>{
        setProductos(res)
      })
      .catch((error)=> alert(error));
    }

    return()=> console.log("Desmontamos ITC")
  },[itemcategoria])


  return (
    <div>
      <Flex>
        {productos.map((items) => <ItemList key={items.id}>{items}</ItemList>)}
      </Flex>
    </div>
  )
}

export default ItemListContainer