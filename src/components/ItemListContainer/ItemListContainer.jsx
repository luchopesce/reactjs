import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import Flex from "../Flex/Flex";
import { useParams } from "react-router";
import Loader from "../Loader/Loader";
import {
  obtenerListaProductos,
  filtrarProducto,
  productoFiltrado
} from "../../services/firebase";
import FilterContainer from "../FilterContainer/FilterContainer";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let { itemcategoria, marcaitem } = useParams();

  useEffect(() => {
    if (!itemcategoria && !marcaitem) {
      obtenerListaProductos()
        .then((res) => {
          setProductos(res);
        })
        .catch((error) => alert(error))
        .finally(() => setLoading(false));
    } else if(!marcaitem){
      filtrarProducto("category", itemcategoria)
        .then((res) => {
          setProductos(res);
        })
        .catch((error) => alert(error))
        .finally(() => setLoading(false));
    }
    else if(!itemcategoria){
      filtrarProducto("marca", marcaitem)
      .then((res) => {
        setProductos(res);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
    }
    return () => console.log("Desmontamos ITC");
  }, [itemcategoria, marcaitem]);

  return (
    <>
      <Flex>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="row g-0">
            <div className="d-flex col-lg-4">
              <FilterContainer productos={productos} />
            </div>
            <div className="row d-flex col-lg-8">
              <ItemList key={productos.id} productos={productos} />
            </div>
          </div>
        )}
      </Flex>
    </>
  );
};

export default ItemListContainer;
