import { useState } from "react";
import Button from "../Button/Button";

const ItemCount = ({ onAddToCart, stock, stockUpdate}) => {
  const [count, setCount] = useState(1);

  function handleCountSum() {
    if (count === stockUpdate) return;
    setCount(count + 1);
  }
  function handleCountRest() {
    if (count === 1) return;
    setCount(count - 1);
  }

  if(stockUpdate === 0){
    return(
      <div>
        <h6 className="alert alert-danger p-2">Producto actualmente sin stock</h6>
      </div>
    )
  }
  else{
    return (
      <div>
        <button
          disabled={count === 1}
          className="btn btn-primary m-1"
          onClick={handleCountRest}
        >
          {" "}
          -{" "}
        </button>
        {count}
        <button
          disabled={count === stock}
          className="btn btn-primary m-1"
          onClick={handleCountSum}
        >
          {" "}
          +{" "}
        </button>
        {
          onAddToCart && <Button onClick={() => onAddToCart(count)}>Agregar al carrito</Button>
        }
      </div>
    );
  }

};

export default ItemCount;
