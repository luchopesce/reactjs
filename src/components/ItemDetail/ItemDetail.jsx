import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";

const ItemDetail = ({
  id,
  title,
  stock,
  price,
  detail,
  imgurl,
  onAddToCart,
  searchItemID,
  stockUpdate,
}) => {
  console.log(stockUpdate);
  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0"
              src={imgurl}
              alt={title}
            />
          </div>
          <div className="col-md-6">
            <div className="small mb-1">ID: {id}</div>
            <h1 className="display-5 fw-bolder">{title}</h1>
            <div className="fs-5 mb-5">
              <span className="text-decoration-line-through">$45.00</span>
              <span className="mx-2 h4">${price}</span>
              <div className="mt-3">
                {stockUpdate === 0 ? (
                  <h6 className="alert alert-danger p-2 text-center">
                    Producto actualmente sin stock
                  </h6>
                ) : (
                  <span className="text-green">
                    Stock disponible: {stock} u.
                  </span>
                )}
              </div>
            </div>
            <p className="lead">{detail}</p>
            <div className="d-flex">
              {searchItemID ? (
                <Link
                  to="/cart"
                  className="btn btn-outline-dark flex-shrink-0 p-2"
                >
                  Ir al carro
                </Link>
              ) : (
                <ItemCount
                  onAddToCart={onAddToCart}
                  stock={stock}
                  itemid={id}
                  stockUpdate={stockUpdate}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetail;
