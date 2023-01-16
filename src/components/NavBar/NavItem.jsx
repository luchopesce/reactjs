import { Link } from "react-router-dom"

const NavItem = (props) => {
  const {link, urlpage} = props.page
  return (
    <>
            <li className='gn-header__item'>
              <Link to={urlpage} className="bar-header__link">
              {link}
              </Link>
            </li>
    </>
  )
}

export default NavItem