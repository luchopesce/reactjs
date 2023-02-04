import { Link } from "react-router-dom";
import Button from "../Button/Button";

function Item(props) {
  const { id, title, category, stock, price, detail, imgurl } =
    props.itemIterado;

  return (
    <div className="col-lg-6 p-3">
      <div className="card text-center rounded-0">
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
          <p className="card-text">{detail}</p>
          <div className="card-text">$ {price}</div>
        </div>
        <div className="card-footer text-muted">
          {" "}
          <Link to={`/detalle/${id}`}>
            <Button className="btn btn-outline-dark rounded-0">Ver mas</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Item;
