import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./firebase";
import { createContext, useState } from "react";
import { setDoc, getFirestore, doc, collection, getDoc } from "firebase/firestore";

export const authContext = createContext({})

const authApp = getAuth(app);
const db = getFirestore(app)

const AuthProvider = (props) => {
    const [isLogin, setIsLogin] = useState(null);

    onAuthStateChanged(authApp, (user) => {
        if (user) {
            setIsLogin(user);
        } else {
            setIsLogin(null);
        }
    });

    async function crearUsuario(email, password, nombre, apellido) {
        const newUsuario = await createUserWithEmailAndPassword(authApp, email, password)
            const docuRef = doc(db, `usuarios/${newUsuario.user.uid}`)
            await setDoc(docuRef, { email: email, nombre: nombre, apellido: apellido })
            return newUsuario
    }

    async function iniciarSesion(email, password) {
        const inicioSesion = await signInWithEmailAndPassword(authApp, email, password)
        return inicioSesion
    }

    async function singLog() {
        const userSing = await signOut(authApp)
        return userSing
    }

    async function dateUser(userId){
        const userRef = collection(db, "usuarios");
        const docRef = doc(userRef, userId)
        const snapshot = await getDoc(docRef)
        return { ...snapshot.data(), id: snapshot.id }
    }


    return (
        <authContext.Provider value={{ isLogin, crearUsuario, iniciarSesion, singLog , dateUser}}>
            {props.children}
        </authContext.Provider>
    )

}

export { AuthProvider }