import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import Flex from "../Flex/Flex";
import { useParams } from "react-router";
import Loader from "../Loader/Loader";
import { obtenerListaProductos, filtrarProducto } from "../../services/db";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let { itemcategoria} = useParams();

  useEffect(() => {
    if (!itemcategoria) {
      obtenerListaProductos()
        .then((res) => {
          setProductos(res);
        })
        .catch((error) => alert(error))
        .finally(() => setLoading(false));
    } else {
      filtrarProducto("category", itemcategoria)
        .then((res) => {
          setProductos(res);
        })
        .catch((error) => alert(error))
        .finally(() => setLoading(false));
    }
    return () => console.log("Desmontamos ITC");
  }, [itemcategoria]);

  if (isLoading) {
    return (
      <Flex>
        <Loader />
      </Flex>
    );
  } else {
    return (
      <Flex>
        {itemcategoria ? (
          <div className="row g-0 d-flex justify-content-center">
            <div className="row d-flex col-lg-12">
              <ItemList key={productos.id} productos={productos} />
            </div>
          </div>
        ) : (
          <div className="row g-0 d-flex justify-content-center">
            <div className="d-flex col-lg-4"></div>
            <div className="row d-flex col-lg-8">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className=" mb-0 text-black mt-5 display-5">Productos</h1>
              </div>
            </div>
            <div className="d-flex col-lg-4">
            </div>
            <div className="row d-flex col-lg-8">
              <ItemList key={productos.id} productos={productos} />
            </div>
          </div>
        )}
      </Flex>
    );
  }
};

export default ItemListContainer;
