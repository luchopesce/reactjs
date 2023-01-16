const productos = [
    {
      id: 1,
      title: "Samsung X30",
      category: "celulares",
      stock: 20,
      price: 500,
      detail: "Celular smartphone Samsung 2022",
      imgurl: "/img/SMARTPHONE.png"
    },
    {
      id: 2,
      title: "Auriculaes Ipods",
      category: "accesorios",
      stock: 12,
      price: 200,
      detail: "Auriculares inalambricos Ipods",
      imgurl: "/img/AURICULARES.png"
    },
    {
      id: 3,
      title: "Samsung S20",
      category: "celulares",
      stock: 100,
      price: 800,
      detail: "Celular smartphone Samsung S20",
      imgurl: "/img/SMARTS20.png"
    },
    {
        id: 4,
        title: "Computadora ALL IN ONE",
        category: "computadoras",
        stock: 22,
        price: 200,
        detail: "Computadora all in one 6gb",
        imgurl: "/img/ALLINONE 1.png"
      }
   ]

const obtenerListaProductos = ()=> {
    return new Promise((res, rej) =>{
        let error = false
        console.log("Conectando a la DB");
        setTimeout(()=>{
            error ? console.log("Error al conectar") : res(productos)
        },1000);
    });
}

const filtrarProducto = (categoriaUrl)=> {
    return new Promise((res, rej) =>{
        let categoriaItem = productos.filter((item)=>item.category === categoriaUrl)
        let error = false
        console.log("Conectando a la DB");
        setTimeout(()=>{
            error ? console.log("Error al conectar") : res(categoriaItem)
        },1000);
    });
}

const obtenerProducto = (idUrl)=> {
    return new Promise((res, rej) =>{
        const findItem = productos.find((item)=>{return (item.id === idUrl)})
        let error = false
        console.log("Conectando a la DB");
        setTimeout(()=>{
            error ? console.log("Error al conectar") : res(findItem)
        },1000);
    });
}

export default obtenerListaProductos

export {obtenerProducto, filtrarProducto}