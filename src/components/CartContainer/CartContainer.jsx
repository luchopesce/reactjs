import { useContext } from "react"
import { cartContext } from "../../storage/cartContext"
import Flex from "../Flex/Flex"
import Button from "../Button/Button"

const CartContainer = () => {
    const {cart, getTotalPrice, removeItemCart, clearCart} = useContext(cartContext)
    if (!cart.length){
        return(
        <Flex>
        <div>No hay productos</div>
        </Flex>)
    }
    else
    return (
    <Flex>{
    cart.map(itemInCart =>(
        <div>
        <div>{itemInCart.title}</div>
        <div>{itemInCart.price}</div>
        <div>{itemInCart.count}</div>
        <Button onClick={()=>removeItemCart(itemInCart.id, 1)}> X </Button>
        </div>
    )) 
    }
        <div>El total es {getTotalPrice}</div>
        <Button onClick={clearCart}> Vaciar carrito </Button>
    </Flex>
  )
}

export default CartContainer