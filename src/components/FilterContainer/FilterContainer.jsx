import Filter from "../Filter/Filter";

const FilterContainer = ({ productos }) => {
  let categoryMap = productos.map((item) => {
    return [item.category, item.category];
  });
  let newCategory = new Map(categoryMap);
  let categoryArr = [...newCategory.values()];
  let category = categoryArr.map((item) => {
    return { link: item, urlpage: `/category/${item}` };
  });

  let marcaMap = productos.map((item) => {
    return [item.marca, item.marca];
  });
  let newMarca = new Map(marcaMap);
  let marcaArr = [...newMarca.values()];
  let marca = marcaArr.map((item) => {
    return { link: item, urlpage: `/marca/${item}` };
  });

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="">
            <div className="">
              <h4 className="">Categories</h4>
              <ul className="">
                <Filter key={productos.id} value={category} />
                <Filter key={productos.id} value={marca} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
