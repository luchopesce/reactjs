import { useState } from "react";

const ItemCount = (props) => {
    const [count, setCount] = useState(1);

    function handleCountSum(){
        if(count === props.children)return;
        setCount(count + 1)
    }
    function handleCountRest(){
        if(count === 1)return;
        setCount(count - 1)
    }
    function agregarCarrito(){
        console.log("Se agregaron: ", {count}, "productos al carro")
    }

  return (
    <div>
        <button disabled={count === 1} className="btn btn-primary m-1" onClick={handleCountRest}> - </button>
        {count}
        <button disabled={count === props.children} className="btn btn-primary m-1" onClick={handleCountSum}> + </button>
        <button  className="btn btn-primary m-2" onClick={agregarCarrito}>Agregar al carrito</button>
    </div>
  )
}

export default ItemCount