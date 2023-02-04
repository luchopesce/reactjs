
import { getFirestore, collection, getDocs, doc, getDoc, query, where, writeBatch, documentId, addDoc } from "firebase/firestore"
import app from "./firebase";

const db = getFirestore(app)

async function obtenerListaProductos() {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("stock", ">", 0))
    const snapshot = await getDocs(q)
    const products = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })
    )
    return products
}

async function obtenerProducto(idUrl) {
    const productsRef = collection(db, "products");
    const docRef = doc(productsRef, idUrl)
    const snapshot = await getDoc(docRef)
    return { ...snapshot.data(), id: snapshot.id }
}

async function filtrarProducto(value, obj) {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where(value, "==", obj))
    const snapshot = await getDocs(q)
    const products = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return products
}

async function createOrder(order) {
    const orderRef = collection(db, "order")
    const productsRef = collection(db, "products")
    const batch = writeBatch(db)
    const arrayID = order.items.map((item) => item.id)
    const q = query(productsRef, where(documentId(), "in", arrayID))
    const querySnapshot = await getDocs(q)
    const docsToUpdate = querySnapshot.docs
    let itemSinStock = []

    docsToUpdate.forEach((doc) => {
        let stock = doc.data().stock
        let itemInCart = order.items.find((item) => item.id === doc.id)
        let newStock = stock - itemInCart.count
        if (newStock < 0) {
            itemSinStock.push(doc.data().title)
        }
        else {
            batch.update(doc.ref, { stock: newStock })
        }
    })

    if (itemSinStock.length >= 1) {
        if (itemSinStock.length === 1) {
            throw new Error(`El producto ${itemSinStock}, no contiene stock`)
        }
        else {
            throw new Error(`Los productos ${itemSinStock}, no contienen stock`)
        }
    }

    await batch.commit()

    let createOrder = await addDoc(orderRef, order)
    return createOrder.id

}

export default db


export { obtenerListaProductos, obtenerProducto, filtrarProducto, createOrder}