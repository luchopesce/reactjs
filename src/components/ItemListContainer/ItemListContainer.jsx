import { useState, useEffect} from "react";
import ItemList from "../ItemList/ItemList";
import Flex from "../Flex/Flex"
import "./itemlistcontainer.css"
import obtenerListaProductos, { filtrarProducto } from "../../services/mockService";
import { useParams } from "react-router";
import Loader from "../Loader/Loader";

const ItemListContainer = () => {
  let {itemcategoria} = useParams();
  console.log(itemcategoria)

  const [productos, setProductos] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if(!itemcategoria){
      obtenerListaProductos().then((res) =>{
        setProductos(res)
      })
      .catch((error)=> alert(error))
      .finally(()=>setLoading(false))
    }
    else{
      filtrarProducto(itemcategoria).then((res) =>{
        setProductos(res)
      })
      .catch((error)=> alert(error))
      .finally(()=>setLoading(false))
    }

    return()=> console.log("Desmontamos ITC")
  },[itemcategoria])


  return (
    <>
    <Flex>
    {
    isLoading ? 
    (<Loader/>) : (
      <ItemList productos={productos}/>
      )
    }
   </Flex>
   </>
  )
}

export default ItemListContainer