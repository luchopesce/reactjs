import { Link } from 'react-router-dom'

const Filter = ({ value}) => {

  return (
    <div>
      {value.map((item) => (
        <Link key={item.link} to={item.urlpage}>
        {item.link}
        </Link>
      ))}
    </div>
  );
};

export default Filter;
