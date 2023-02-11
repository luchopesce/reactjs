import { Link } from "react-router-dom";
import { cartContext } from "../../storage/cartContext";
import { useContext } from "react";

const CartWidget = () => {
  const { sumaCount, cart } = useContext(cartContext);
  return (
    <Link to="/cart" className="bar-header__link">
      {cart.length > 0 ? (
        <div className="position-relative">
          <i className="bi bi-cart-check text-black" style={{ fontSize: "1.2rem" }} />
          <span className="position-absolute badge rounded-pill bg-dark" style={{top:"-6px", right:"-14px", padding:"2px", width:"15px", textAlign:"center"}}>
            {sumaCount}
          </span>
        </div>
      ) : (
        <>
          <div className="position-relative">
            <i className="bi bi-cart text-black" style={{ fontSize: "1.2rem" }} />
          </div>
        </>
      )}
    </Link>
  );
};

export default CartWidget;
