import "./flex.css";

const Flex = (props) => {
  return (
    <div className="flexContainer">
        {props.children}
    </div>
  )
}

export default Flex