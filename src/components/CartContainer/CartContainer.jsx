import { useContext, useEffect } from "react";
import { cartContext } from "../../storage/cartContext";
import Flex from "../Flex/Flex";
import Button from "../Button/Button";
import "./cartcontainer.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const CartContainer = () => {
  const navigate = useNavigate();
  const {
    cart,
    getTotalPrice,
    removeItemCart,
    sumCart,
    updateCart,
    restCart,
    sumaCount,
    clearCart,
  } = useContext(cartContext);

  function ClearCart() {
    Swal.fire({
      icon: "warning",
      title: "Eliminar productos del carro",
      text: `Estas por eliminar los productos del carro, deseas continuar?`,
      showCancelButton: true,
      confirmButtonText: "Eliminar productos",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire("Productos eliminados", "", "success");
      }
    });
  }

  if (!cart.length) {
    return (
      <Flex>
        <div className="d-flex justify-content-center">No hay productos</div>
      </Flex>
    );
  } else
    return (
      <Flex>
        <div className="row g-0">
          <div className="col-lg-8">
            <div className="p-5">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="fw-bold mb-0 text-black">Carro de compras</h1>
                <div className="d-flex">
                  <h6 className="mb-0 mx-2 text-muted">
                    Carrito({cart.length})
                  </h6>
                  <Button
                    onClick={() => ClearCart()}
                    className="btn btn-link p-0"
                  >
                    <i className="bi bi-trash3 text-muted"></i>
                  </Button>
                </div>
              </div>
              {cart.map((itemInCart) => (
                <div
                  key={itemInCart.id}
                  className="row mb-4 d-flex justify-content-between align-items-center"
                >
                  <hr className="my-4" />
                  <div className="col-md-2 col-lg-2 col-xl-2">
                    <img
                      src={itemInCart.imgurl}
                      className="img-fluid rounded-3"
                      alt={itemInCart.title}
                    />
                  </div>
                  <div className="col-md-3 col-lg-3 col-xl-3">
                    <h6 className="text-muted">{itemInCart.title}</h6>
                    <h6 className="text-black mb-0">{itemInCart.detail}</h6>
                  </div>
                  <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <Button
                      className="btn btn-link px-2"
                      onClick={() => restCart(itemInCart.id)}
                    >
                      <i className="bi bi-dash" />
                    </Button>
                    <input
                      id={itemInCart.id}
                      min="1"
                      name="quantity"
                      value={itemInCart.count}
                      className="form-control form-control-sm"
                      onChange={(e) => updateCart(e)}
                    />
                    <Button
                      className="btn btn-link px-2"
                      onClick={() => sumCart(itemInCart.id)}
                    >
                      <i className="bi bi-plus" />
                    </Button>
                  </div>
                  <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h6 className="mb-0">$ {itemInCart.price}</h6>
                  </div>
                  <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                    <Button
                      className="btn btn-danger"
                      onClick={() => removeItemCart(itemInCart.id)}
                    >
                      <i className="bi bi-x" />
                    </Button>
                  </div>
                </div>
              ))}
              <hr className="my-4" />
              <div className="pt-5">
                <h6 className="mb-0">
                  <Link to="/" className="text-body">
                    <i className="bi bi-arrow-left-short mt-3 px-2" />
                    Volver al shop
                  </Link>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-lg-4 bg-grey">
            <div className="p-5">
              <h3 className="fw-bold mb-5 mt-2 pt-1">Resumen del carrito</h3>
              <hr className="my-4" />
              <div className="d-flex justify-content-between mb-4">
                <h5 className="text-uppercase">Total de productos</h5>
                <h5>{sumaCount}</h5>
              </div>
              <h5 className="text-uppercase mb-3">Metodo de envio</h5>
              <div className="mb-4 pb-2">
                <select className="form-select">
                  <option value="1">Envio a domicilio</option>
                  <option value="2">Retiro en la sucursal</option>
                </select>
              </div>
              <h5 className="text-uppercase mb-3">Codigo postal</h5>
              <div className="mb-5">
                <div className="form-floating">
                  <input
                    type="text"
                    id="form3Examplea2"
                    className="form-control"
                  />
                  <label className="floatingInput">
                    Calcular costo de envio
                  </label>
                </div>
              </div>
              <hr className="my-4" />
              <div className="d-flex justify-content-between mb-5">
                <h5 className="text-uppercase">Precio total</h5>
                <h5>$ {getTotalPrice}</h5>
              </div>
              <Button
                onClick={() => {
                  navigate("checkorden");
                }}
                className="btn btn-dark"
              >
                Continuar checkout
              </Button>
            </div>
          </div>
        </div>
      </Flex>
    );
};

export default CartContainer;
