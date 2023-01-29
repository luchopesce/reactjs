import { useContext } from "react";
import { cartContext } from "../../storage/cartContext";
import Flex from "../Flex/Flex";
import Button from "../Button/Button";
import "./cartcontainer.css";
import { Link } from "react-router-dom";

const CartContainer = () => {
    const { cart, getTotalPrice, removeItemCart, clearCart, updateCart } =
        useContext(cartContext);
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
                                <h6 className="mb-0 text-muted">Carrito({cart.length})</h6>
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
                                        <button className="btn btn-link px-2">
                                            <i className="bi bi-dash"></i>
                                        </button>
                                        <input
                                            id={itemInCart.id}
                                            min="1"
                                            name="quantity"
                                            value={itemInCart.count}
                                            className="form-control form-control-sm"
                                            onChange={(e) => updateCart(e)}
                                        />
                                        <button className="btn btn-link px-2">
                                            <i className="bi bi-plus"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                        <h6 className="mb-0">$ {itemInCart.price}</h6>
                                    </div>
                                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                        <Button
                                            className="btn btn-danger"
                                            key={itemInCart.id}
                                            onClick={() =>
                                                removeItemCart(itemInCart.id, itemInCart.count)
                                            }
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
                                        <i className="bi bi-arrow-left-short mt-2" />
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
                                <h5 className="text-uppercase">Total de productos: </h5>
                                <h5>$ {getTotalPrice}</h5>
                            </div>
                            <h5 className="text-uppercase mb-3">Shipping</h5>
                            <div className="mb-4 pb-2">
                                <select className="form-select">
                                    <option value="1">Standard-Delivery- €5.00</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    <option value="4">Four</option>
                                </select>
                            </div>
                            <h5 className="text-uppercase mb-3">Give code</h5>
                            <div className="mb-5">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        id="form3Examplea2"
                                        className="form-control"
                                    />
                                    <label className="floatingInput">Enter your code</label>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="d-flex justify-content-between mb-5">
                                <h5 className="text-uppercase">Total price</h5>
                                <h5>€ 137.00</h5>
                            </div>
                            <button
                                type="button"
                                className="btn-lg btn-dark"
                                data-mdb-ripple-color="dark"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </Flex>
        );
};

export default CartContainer;
