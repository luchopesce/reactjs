import "./flex.css";

const Flex = (props) => {
  return (
    <section className="h-100 h-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
                <div className="card-body p-0">
                  {props.children}
                </div>
              </div>
            </div>
          </div>
    </section>
  )
}

export default Flex