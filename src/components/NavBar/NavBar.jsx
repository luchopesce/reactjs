import "./navbar.css";
import logo from "../../assets/img/LOGO-STORECELL.svg";
import CartWidget from "./CartWidget";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../services/auth";

const NavBar = () => {
  const { isLogin, singLog } = useContext(authContext);

  const links = [
    {
      link: "Store",
      urlpage: "/",
    },
    {
      link: "Computadoras",
      urlpage: "/category/computadoras",
    },
    {
      link: "Celulares",
      urlpage: "/category/celulares",
    },
    {
      link: "Accesorios",
      urlpage: "/category/accesorios",
    },
  ];

  return (
    <header className="gn-header">
      <div className="gn-header__bar">
        <div className="gn-header__tier">
          <div className="bar-header__lock-up">
            <div className="bar-header__logo gn-header__item">
              <Link to="/" className="bar-header__link bar-header-logo__link">
                <span className="-off-screen">StoreCELL Store</span>
                <img className="header-logo-img" src={logo} alt="Logo" />
              </Link>
            </div>
          </div>
          <nav className="bar-header__link-bar">
            <ul className="gn-header__list">
              {links.map((elemento) => (
                <NavItem key={elemento.urlpage} page={elemento} />
              ))}
            </ul>
            <div className="col-md-2 col-xxl-1 text-end d-none d-lg-block">
              <div className="list-inline me-4">
                <div className="list-inline-item me-4">
                  <CartWidget />
                </div>
                <div className="list-inline-item me-4">
                  <div className="text-muted">
                    <Link to="/login">
                      <i
                        className="bi bi-person-fill text-black"
                        style={{ fontSize: "1.2rem" }}
                      ></i>
                    </Link>
                  </div>
                </div>
                {isLogin && (
                  <div className="list-inline-item">
                    <div className="text-muted">
                      <Link onClick={() => singLog()}>
                        <i
                          className="bi bi-box-arrow-left text-black"
                          style={{ fontSize: "1.2rem" }}
                        ></i>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
