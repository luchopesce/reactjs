import { useState, useEffect, useContext } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { obtenerProducto } from "../../services/db";
import { useParams } from "react-router-dom";
import { cartContext } from "../../storage/cartContext";
import Loader from "../Loader/Loader";
import Flex from "../Flex/Flex";

const ItemDetailContainer = () => {
  let params = useParams();
  const [producto, setProducto] = useState([]);
  const { addItemCart, cart } = useContext(cartContext);
  const [isLoading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const searchItemID = cart.find((item) => item.id === producto.id);
  let stockUpdate = producto.stock
  if (searchItemID){
    stockUpdate = producto.stock - searchItemID.count
  }

  function handleAddToCart(count) {
    if (!Number.parseInt(count) || undefined || 0){
      return
    }
    else {
      addItemCart({ ...producto, count: count });
      setIsInCart(true);
    }

  }

  useEffect(() => {
    obtenerProducto(params.itemid)
      .then((res) => {
        setProducto(res);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <>
      {isLoading ? (
        <Flex>
          <Loader />
        </Flex>
      ) : (
        <Flex>
          <ItemDetail
            isInCart={isInCart}
            onAddToCart={handleAddToCart}
            id={producto.id}
            title={producto.title}
            stock={producto.stock}
            price={producto.price}
            detail={producto.detail}
            imgurl={producto.imgurl}
            searchItemID={searchItemID}
            stockUpdate={stockUpdate}
          />
        </Flex>
      )}
    </>
  );
};

export default ItemDetailContainer;
