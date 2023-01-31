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
  stockUpdate
}) => {
  console.log(stockUpdate)
  return (
    <div className="col-lg-6 p-3">
      <div className="card text-center">
        <div className="card-header">{title}</div>
        <div className="card-body card-registration">
          <Link to={`/detalle/${id}`}>
            <img
              className="hover-shadow"
              height="250px"
              src={imgurl}
              alt={title}
            />
          </Link>
          <p className="card-text">
            {detail}
          </p>
          {searchItemID ? (
            <Link to="/cart" className="btn btn-primary">
              Ir al carro
            </Link>
          ) : (
            <ItemCount onAddToCart={onAddToCart} stock={stock} itemid={id} />
          )}
        </div>
        <div className="card-footer text-muted">{price}</div>
      </div>
    </div>
  );
};

export default ItemDetail;
