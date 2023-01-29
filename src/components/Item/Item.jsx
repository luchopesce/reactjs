import { Link } from "react-router-dom";
import Button from "../Button/Button";

function Item(props) {
    const { id, title, category, stock, price, detail, imgurl } =
        props.itemIterado;

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
                        With supporting text below as a natural lead-in to additional
                        content.
                    </p>
                    <Link to={`/detalle/${id}`}>
                        <Button className="btn btn-dark">Ver mas</Button>
                    </Link>
                </div>
                <div className="card-footer text-muted">{price}</div>
            </div>
        </div>
    );
}

export default Item;
