import { createContext, useState } from 'react';

export const cartContext = createContext({})

const CartProvider = (props) => {
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
        if (isInCart !== -1) {
            newCart[isInCart].count += item.count
            setCart(newCart)
        }
        else {
            newCart.push(item);
            setCart(newCart);
        }
    }

    const updateCart = (e) => {
        const newProduct = cart.map(product => {
            if (product.id === e.target.id) {
                if (!Number.parseInt(e.target.value) || undefined || 0) {
                    product.count = 1
                }
                else if (Number.parseInt(e.target.value) > product.stock) {
                    product.count = product.stock
                }
                else {
                    product.count = Number.parseInt(e.target.value);
                }
            }
            return product;
        })
        setCart(newProduct)
    }

    function sumCart(itemid) {
        const newProduct = cart.map(product => {
            if (product.id === itemid) {
                if (product.count >= product.stock) {
                    product.count = product.stock
                }
                else {
                    product.count += 1
                }
            }
            return product;
        })
        setCart(newProduct)
    }

    function restCart(itemid) {
        const newProduct = cart.map(product => {
            if (product.id === itemid) {
                if (product.count <= 1) {
                    product.count = 1
                }
                else {
                    product.count -= 1
                }
            }
            return product;
        })
        setCart(newProduct)
    }

    function removeItemCart(itemid) {
        let itemRemove = cart.findIndex(itemInCart => itemInCart.id === itemid)
        let newRemove = cart.map((item) => item)
        if (itemRemove !== -1) {
            let newRemoveArr = newRemove.filter((item) => { return item.id !== itemid })
            setCart(newRemoveArr)
        }
    }

    function clearCart() {
        if (cart.length > 0) {
            setCart([]);
        }
    }

    return (
        <cartContext.Provider value={{ cart, addItemCart, removeItemCart, clearCart, updateCart, sumCart, restCart, sumaCount, getTotalPrice}}>
            {props.children}
        </cartContext.Provider>
    )
}

export { CartProvider }