import authApp, { crearUsuario, iniciarSesion } from "../../services/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LogIn = () => {
  //crea un estado para saber si el usuario se esta registrando
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(null);
  const navigate = useNavigate();

  onAuthStateChanged(authApp, (user) => {
    if (user) {
      setIsLogin(user);
    } else {
      setIsLogin(null);
    }
  });

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
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;

    if (isRegister) {
      crearUsuario(correo, password)
        .then((usuarioFirebase) => {
          console.log("usuario creado:", usuarioFirebase);
          setIsRegister(usuarioFirebase);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      iniciarSesion(correo, password)
        .then((usuarioFirebase) => {
          console.log("sesión iniciada con:", usuarioFirebase.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (isLogin) {
    return <div></div>;
  } else {
    return (
      <div>
        <h1> {isRegister ? "Regístrate" : "Inicia sesión"}</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="emailField"> Correo </label>
          <input type="email" id="emailField" />
          <label htmlFor="passwordField"> Contraseña </label>
          <input type="password" id="passwordField" />
          <button type="submit">
            {" "}
            {isRegister ? "Regístrate" : "Inicia sesión"}{" "}
          </button>
        </form>
        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "¿Ya tienes cuenta? ¡Inicia sesión"
            : "¿No tienes cuenta? ¡Regístrate gratis!"}
        </button>
      </div>
    );
  }
};

export default LogIn;
