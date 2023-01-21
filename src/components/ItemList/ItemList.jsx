import Item from "../Item/Item";

const ItemList = ({productos}) => {
  return (
    <>
    {productos.map((items) => <Item key={items.id} itemIterado={items}/>)}
    </>
  )
}

export default ItemList