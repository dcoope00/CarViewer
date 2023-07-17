import Car from './Car';
import classes from './CarList.module.css';

function CarList(props) {
  return (
    <ul className={classes.list}>
      {props.cars.map((car) => (
        <Car
          key={car.id}
          id={car.id}
          image={car.image}
          make = {car.make}
          model = {car.model}
          color = {car.color}
          description = {car.description}
        />
      ))}
    </ul>
  );
}

export default CarList;
