import './navbar.css'
import logo from '../../assets/img/LOGO-STORECELL.svg'
import CardWidget from './CardWidget'
import NavItem from './NavItem'

const NavBar = () => {

  const links = [
    {
      link:"Store",
      urlpage:"/store"
    },
    {
      link:"Computadoras",
      urlpage:"/computadoras"
    },
    {
      link:"Celulares",
      urlpage:"/celulares"
    },
    {
      link:"Accesorios",
      urlpage:"/accesorios"
    }
  ];

return (
<header className='gn-header'>
    <div className='gn-header__bar'>
      <div className='gn-header__tier'>
        <div className='bar-header__lock-up'>
          <div className='bar-header__logo gn-header__item'>
            <a href='#' className='bar-header__link bar-header-logo__link'>
              <span className='-off-screen'>
              StoreCELL Store
              </span>
              <img className='header-logo-img' src={logo}/>
            </a>
          </div>
        </div>
        <nav className='bar-header__link-bar'>
          <ul className='gn-header__list'>
            {links.map((elemento)=>
              <NavItem key={elemento.urlpage} page={elemento}/>
            )}
          </ul>
          <CardWidget/>
        </nav>
      </div>
    </div>
</header>
  )
}

export default NavBar