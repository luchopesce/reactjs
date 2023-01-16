import cart from '../../assets/img/cart3.svg'
import './cardwidget.css'
import { Link } from 'react-router-dom'

const CardWidget = () => {
  return (
    <div className='gn-header__item gn-header__cardwidget'>
      <Link to="/Carrito" className='bar-header__link'>
      <img className='' src={cart} width='28' height='28'/>
      </Link>
    </div>
  )
}

export default CardWidget