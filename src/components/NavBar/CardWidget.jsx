import cartLogo from '../../assets/img/cart3.svg'
import './cardwidget.css'
import { Link } from 'react-router-dom'
import { cartContext } from '../../storage/cartContext'
import { useContext} from 'react'

const CardWidget = () => {
  const {sumaCount, cart} = useContext(cartContext)
  return (
    <div className='gn-header__item gn-header__cardwidget'>
      <Link to="/cart" className='bar-header__link'>
      <img className='' src={cartLogo} width='28' height='28' alt='Logo'/>
      {
      cart.length > 0 && sumaCount
      }
      </Link>
    </div>
  )
}

export default CardWidget