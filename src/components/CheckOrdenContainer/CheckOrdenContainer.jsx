import Flex from "../Flex/Flex";
import { createOrder } from "../../services/db";
import Swal from "sweetalert2";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../../services/auth";
import { cartContext } from "../../storage/cartContext";
import { useNavigate } from "react-router-dom";
import PageNotFound from "../../pages/PageNotFound";

const CheckOrdenContainer = () => {
  const { isLogin, dateUser } = useContext(authContext);
  const { cart, getTotalPrice, clearCart, sumaCount } = useContext(cartContext);
  const [isLoginCart, setIsLoginCart] = useState(false);
  const [userDate, setUserDate] = useState({});
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      const provincia = document.getElementById("provincia");
      fetch("https://apis.datos.gob.ar/georef/api/provincias")
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((res) => setProvincias(Object.values(res.provincias)));
      dateUser(isLogin.uid).then((res) => {
        setUserDate(res);
      });

      if (provincia) {
        provincia.addEventListener("change", (e) => {
          if (e.target.value !== "") {
            getMunicipio(e.target.value);
          } else {
            setMunicipios([]);
          }
        });
      }

      function getMunicipio(provincia) {
        fetch(
          `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&max=1000`
        )
          .then((res) => (res.ok ? res.json() : Promise.reject(res)))
          .then((res) => setMunicipios(Object.values(res.municipios)));
      }

      const forms = document.querySelectorAll(".needs-validation");
      Array.from(forms).forEach((form) => {
        form.addEventListener(
          "submit",
          (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    }
    if (!isLogin && cart.length >= 1) {
      setIsLoginCart(true);
      setTimeout(() => {
        navigate(`/login`, { state: { isLoginCart } });
      }, 2000);
    } else {
      setIsLoginCart(false);
    }
  }, [isLogin, isLoginCart, dateUser, cart, navigate]);

  function handleCheckout(e) {
    e.preventDefault();
    const name = e.target.firstName.value;
    const apellido = e.target.lastName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const address2 = e.target.address2.value;
    const provincia = e.target.provincia.value;
    const localidad = e.target.localidad.value;
    const codezip = e.target.codeZip.value;
    const paymethod = e.target.payMethod.value;

    const items = cart.map((item) => ({
      id: item.id,
      price: item.price,
      count: item.count,
      title: item.title,
    }));
    const order = {
      buyer: {
        uid: isLogin.uid,
        name: name,
        apellido: apellido,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        provincia: provincia,
        localidad: localidad,
        codezip: codezip,
        paymethod: paymethod,
      },
      items: items,
      total: getTotalPrice,
      date: new Date(),
    };
    console.table(order);
    createOrder(order)
      .then((res) => {
        clearCart();
        Swal.fire({
          title: "Compra realizada con exito!",
          text: `Compraste el producto con el id ${res}`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          navigate(`/checkorden/${res}`);
        });
      })
      .catch((error) =>
        Swal.fire({
          title: "Problemas para realizar la compra!",
          text: `${error}`,
          icon: "error",
          confirmButtonText: "OK",
        })
      );
  }

  if (cart.length === 0) {
    return <PageNotFound />;
  } else if (!isLogin) {
    return (
      <Flex>
        <div className="d-flex container">
          <h3>Necesitas iniciar sesion para continuar</h3>
        </div>
      </Flex>
    );
  } else {
    return (
      <Flex>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Mi carrito</span>
              <span className="badge bg-primary rounded-pill">{sumaCount}</span>
            </h4>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between lh-sm"
                >
                  <div>
                    <h6 className="my-0">{item.title}</h6>
                    <small className="text-muted">{item.detail}</small>
                  </div>
                  <span className="text-muted">${item.price}</span>
                </li>
              ))}

              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span className="text-success">−$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (Pesos)</span>
                <strong>$ {getTotalPrice}</strong>
              </li>
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="btn btn-secondary"
                >
                  CODIGO
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Datos de mi envio</h4>
            <form
              className="needs-validation"
              onSubmit={handleCheckout}
              noValidate
            >
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    defaultValue={userDate.nombre}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Apellido
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    defaultValue={userDate.apellido}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    defaultValue={userDate.email}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Direccion
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label">
                    Direccion 2 <span className="text-muted">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="phone" className="form-label">
                    Celular
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="Numero de contacto"
                    required
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="provincia" className="form-label">
                    Provincia
                  </label>
                  <select className="form-select" id="provincia" required>
                    <option value="">Seleccionar provincias</option>
                    {provincias &&
                      provincias.map((prov) => (
                        <option key={prov.nombre} value={prov.nombre}>
                          {prov.nombre}
                        </option>
                      ))}
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="localidad" className="form-label">
                    Localidad
                  </label>
                  <select className="form-select" id="localidad" required>
                    <option value="">Seleccionar localidad</option>
                    {municipios &&
                      municipios.map((muni) => (
                        <option key={muni.nombre} value={muni.nombre}>
                          {muni.nombre}
                        </option>
                      ))}
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="codeZip" className="form-label">
                    Codigo postal
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="codeZip"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                />
                <label className="form-check-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                />
                <label className="form-check-label" htmlFor="save-info">
                  Save this information htmlFor next time
                </label>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Forma de pago</h4>

              <div className="my-3">
                <div className="form-check">
                  <input
                    id="credit"
                    name="payMethod"
                    type="radio"
                    className="form-check-input"
                    value="credit"
                    required
                  />
                  <label className="form-check-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="debit"
                    name="payMethod"
                    type="radio"
                    className="form-check-input"
                    value="debit"
                    required
                  />
                  <label className="form-check-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="paypal"
                    name="payMethod"
                    type="radio"
                    className="form-check-input"
                    value="paypal"
                    required
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </Flex>
    );
  }
};

export default CheckOrdenContainer;
