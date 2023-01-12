import Button from "../Button/Button";

function Item(props) {

    const {id, title, category, stock, price, detail, imgurl} = props.item


    return(
        <div className="card mx-2 py-2 my-2 px-2">
            <img height="250px" src={imgurl} alt={title} />
            <h6>{title}</h6>
            <h6>{price}</h6>
            <h6>{detail}</h6>
            <Button>Ver mas</Button>
        </div>
    )
}

export default Item;