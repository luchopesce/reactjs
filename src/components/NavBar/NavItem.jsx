const NavItem = (props) => {
  const {link, urlpage} = props.page
  return (
    <>
            <li className='gn-header__item'>
              <a href={urlpage} className='bar-header__link'>
                {link}
              </a>
            </li>
    </>
  )
}

export default NavItem