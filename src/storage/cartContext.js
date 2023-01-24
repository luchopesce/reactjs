import { createContext, useState } from 'react';

export const cartContext = createContext({cart:[]})

const CartProvider = (props) =>{
    const [cart, setCart] = useState([])
    
    const sumaCount = cart.reduce(function (accumulator, curValue) {
        return accumulator + curValue.count
    }, 0)

    const getTotalPrice = cart.reduce(function (accumulator, curValue) {
        return accumulator + (curValue.price * curValue.count)
    }, 0)

    function addItemCart(item) {
        let isInCart = cart.findIndex(itemInCart => itemInCart.id === item.id)
        let newCart = cart.map((item) => item)
        if(isInCart !== -1){
            newCart[isInCart].count += item.count
            setCart(newCart)
        }
        else{
            newCart.push(item);
            setCart(newCart);
        }
    }

    function removeItemCart(itemid, countDelete) {
        let itemRemove = cart.findIndex(itemInCart => itemInCart.id === itemid)
        let newRemove = cart.map((item) => item)
        if(itemRemove !== -1){
            if(countDelete <= newRemove[itemRemove].count){
                newRemove[itemRemove].count -= countDelete
                if(newRemove[itemRemove].count < 1){
                    let newRemoveArr = newRemove.filter((item) =>{return item.id !== itemid})
                    setCart(newRemoveArr)
                }
                else{
                    setCart(newRemove)
                }
            }
            else{
                alert("No puedes remover menos de lo que agregaste")
            }
        }
        else{
            alert("No tienes nada agregado al carrito")
        }
    }

    function clearCart (){
        if(cart.length > 0){
            setCart([]);
        }
        else{
            alert("No tienes nada en el carro")
        }
    }


    return(
        <cartContext.Provider value={{cart, addItemCart, removeItemCart, clearCart, sumaCount, getTotalPrice}}>
            {props.children}
        </cartContext.Provider>
    )
}

export { CartProvider }