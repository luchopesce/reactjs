// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvJftS-34Dafszma4MVelulrvPCgvaBu0",
  authDomain: "reactjs-pesce.firebaseapp.com",
  projectId: "reactjs-pesce",
  storageBucket: "reactjs-pesce.appspot.com",
  messagingSenderId: "426246385156",
  appId: "1:426246385156:web:f60ffb0a96783894bb4f51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

async function obtenerListaProductos() {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef)
    const products = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    return products
}

async function obtenerProducto (idUrl){
    const productsRef = collection(db, "products");
    const docRef = doc(productsRef, idUrl)
    const snapshot = await getDoc(docRef)
    return {...snapshot.data(), id: snapshot.id}
}

async function filtrarProducto(value, obj) {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where(value, "==", obj))
    const snapshot = await getDocs(q)
    const products = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    return products
}

async function productoFiltrado(val1, val2, obj1, obj2) {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where(val1, val2, "==", obj1, obj2))
    const snapshot = await getDocs(q)
    const products = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    return products
}

export default app

export {obtenerListaProductos, obtenerProducto, filtrarProducto, productoFiltrado}
