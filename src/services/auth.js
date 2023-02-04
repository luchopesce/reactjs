import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebase";

const authApp = getAuth(app);

async function crearUsuario(email, password) {
    const newUsuario = await createUserWithEmailAndPassword(authApp, email, password)
    return newUsuario
}

async function iniciarSesion(email, password) {
    const inicioSesion = await signInWithEmailAndPassword(authApp, email, password)
    return inicioSesion
}

export default authApp

export { crearUsuario, iniciarSesion }