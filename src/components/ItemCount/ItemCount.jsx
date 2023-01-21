import { useState } from "react";
import Button from "../Button/Button";

const ItemCount = ({ onAddToCart, stock }) => {
    const [count, setCount] = useState(1);

    function handleCountSum(){
        if(count === stock)return;
        setCount(count + 1)
    }
    function handleCountRest(){
        if(count === 1)return;
        setCount(count - 1)
    }

  return (
    <div>
        <button disabled={count === 1} className="btn btn-primary m-1" onClick={handleCountRest}> - </button>
        {count}
        <button disabled={count === stock} className="btn btn-primary m-1" onClick={handleCountSum}> + </button>
        <Button onClick={()=>onAddToCart(count)}>Agregar al carrito</Button>
    </div>
  )
}

export default ItemCount