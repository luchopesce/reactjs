import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { authContext } from "../../services/auth";

const Register = () => {
  const [error, setError] = useState(false);
  const { isLogin, crearUsuario } = useContext(authContext);
  const navigate = useNavigate();

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
    const name = e.target.floatingName.value;
    const surname = e.target.floatingSurname.value;

    if ((correo, password, name, surname === null || undefined || "")) {
      if (!error) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1000);
      }
      return;
    }
    crearUsuario(correo, password, name, surname)
      .then((usuarioFirebase) => {
        console.log("usuario creado:", usuarioFirebase);
      })
      .catch((error) => {
        console.log(error);
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
            <div className="col-12 col-md-8 col-lg-6 col-xl-6">
              <div className="card bg-dark" style={{ borderRadius: "1rem" }}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-white mb-5">Registrate</h2>
                    <form onSubmit={submitHandler}>
                      <div className="form-floating mb-5">
                        <input
                          type="email"
                          className="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Email</label>
                      </div>
                      <div className="form-floating mb-5">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>
                      <div className="form-floating mb-5">
                        <input
                          type="name"
                          className="form-control"
                          id="floatingName"
                          placeholder="Name"
                        />
                        <label htmlFor="floatingName">Nombre</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="surname"
                          className="form-control"
                          id="floatingSurname"
                          placeholder="Surname"
                        />
                        <label htmlFor="floatingSurname">Apellido</label>
                      </div>
                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-5"
                        type="submit"
                      >
                        Registrarme
                      </button>
                      {error && (
                        <h6 className="alert alert-danger my-2">
                          Datos invalidos
                        </h6>
                      )}
                    </form>
                  </div>

                  <div>
                    <p className="mb-0 text-white">
                      Ya estas registrado?{" "}
                      <Link to="/login" className="text-white-50 fw-bold">
                        Ingresa con tu cuenta
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

export default Register;
