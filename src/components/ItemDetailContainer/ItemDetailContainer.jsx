import { useState, useEffect} from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import Flex from "../Flex/Flex";
import {obtenerProducto} from "../../services/mockService"
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
    let params = useParams();
    console.log(params.itemid)

    const [producto, setProducto] = useState([])

    useEffect(() => {
    obtenerProducto(parseInt(params.itemid)).then((res) =>{
        setProducto(res)
      })
      .catch((error)=> alert(error));
    },[])
  
    return (
      <div>
        <Flex>
          <ItemDetail key={params.itemid} producto={producto}/>
        </Flex>
      </div>
    )

}

export default ItemDetailContainer