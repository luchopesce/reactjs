import cart from '../../assets/img/cart3.svg'
import './cardwidget.css'

const CardWidget = () => {
  return (
    <div className='gn-header__item gn-header__cardwidget'>
        <a className='bar-header__link' href='#'>
            <img className='' src={cart} width='32' height='32'/>
        </a>
    </div>
  )
}

export default CardWidget