import { createContext, useState } from 'react';

export const cartContext = createContext({cart:[]})

const CartProvider = (props) =>{
    const [cart, setCart] = useState([])

   function addCart(item) {
    setCart([...cart, item])
    }

    return(
        <cartContext.Provider value={{cart, addCart}}>
            {props.children}
        </cartContext.Provider>
    )
}

export { CartProvider }