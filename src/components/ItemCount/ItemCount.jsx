import { useState } from "react";
import Button from "../Button/Button";

const ItemCount = ({ onAddToCart, stockUpdate }) => {
  const [count, setCount] = useState(1);

  function handleCountSum() {
    if (count === stockUpdate) return;
    setCount(count + 1);
  }
  function handleCountRest() {
    if (count === 1) return;
    setCount(count - 1);
  }

  function updateCount(e) {
    if (!Number.parseInt(e.target.value) || undefined || 0) {
      setCount(1);
    } else if (Number.parseInt(e.target.value) > stockUpdate) {
      setCount(stockUpdate);
    } else {
      setCount(Number.parseInt(e.target.value));
    }
  }

  if (stockUpdate === 0) {
    return (
      <div>
        <h6 className="alert alert-danger p-2">
          Producto actualmente sin stock
        </h6>
      </div>
    );
  } else {
    return (
      <>
        <button className="btn btn-link px-2" onClick={() => handleCountRest()}>
          <i className="bi bi-dash" />
        </button>
        <input
          min="1"
          name="quantity"
          value={count}
          className="form-control text-center"
          onChange={(e) => updateCount(e)}
          style={{ maxWidth: "3rem" }}
        />
        <button className="btn btn-link px-2" onClick={() => handleCountSum()}>
          <i className="bi bi-plus" />
        </button>
        {onAddToCart && (
          <Button
            className="btn btn-outline-dark flex-shrink-0 mx-3 p-2"
            onClick={() => onAddToCart(count)}
          >
            Agregar al carrito
            <i className="bi-cart-fill me-1"></i>
          </Button>
        )}
      </>
    );
  }
};

export default ItemCount;
