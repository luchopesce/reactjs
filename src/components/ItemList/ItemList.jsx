import Item from "../Item/Item";

const ItemList = (props) => {
  return (
    <>
    <Item item={props.children}></Item>
    </>
  )
}

export default ItemList