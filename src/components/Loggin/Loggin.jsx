import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { authContext } from "../../services/auth";
import { Link } from "react-router-dom";

const Loggin = () => {
  const { isLogin, iniciarSesion } = useContext(authContext);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (isLogin) {
      console.log(isLogin);
      Swal.fire({
        title: "Ya estas logiado",
        text: `Estas con el usuario ${isLogin.email}`,
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate(`/`);
      });
    }
  }, [isLogin, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const correo = e.target.floatingInput.value;
    const password = e.target.floatingPassword.value;

    if ((correo, password === null || undefined || "")) {
      if(!error){
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1000);
      }
      return;
    }
    iniciarSesion(correo, password)
      .then((usuarioFirebase) => {
        console.log("sesión iniciada con:", usuarioFirebase.user);
        if(state.isLoginCart){
          console.log(state.isLoginCart);
          navigate(`/cart/checkorden`);
        }
        else{
          navigate(`/`);
        }
      })
      .catch((error) => {
        console.log(error)
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      });
  };

  if (isLogin) {
    return <div></div>;
  } else {
    return (
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark" style={{ borderRadius: "1rem" }}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-white mb-5">
                      Iniciar sesion
                    </h2>
                    <form onSubmit={submitHandler}>
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Email</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>
                      <p className="small mb-3 mt-2 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Olvidaste la password?
                        </a>
                      </p>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Iniciar sesion
                      </button>
                      {error && (
                        <h6 className="alert alert-danger my-2">
                          Datos invalidos
                        </h6>
                      )}
                    </form>

                    <div className="row d-flex  mt-4 pt-1">
                      <Link className="text-white">
                        <i className="bi bi-google"></i>
                        <span className="mx-3">Iniciar sesion con Google</span>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0 text-white">
                      Aun no estas registrado?{" "}
                      <Link to="/register" className="text-white-50 fw-bold">
                      Registrate
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Loggin;
