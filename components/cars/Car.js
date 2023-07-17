import Card from '../ui/Card';
import classes from './Car.module.css';
import { useRouter } from "next/router"

function Car(props) {
  //useRouter runs twice, on page load and then again once it knows whats in the url
  //useRouter is a react hook so must follow rules of react hooks and must be used at the top level

  const router = useRouter()

  const showDetailsHandler = () => {
    //the router object gives access to navigation methods and concrete values of dynamic path segments
    //here a dynamic route is used to show the contents of whichever "show details" button is clicked
    router.push("/" + props.id)

  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={`${props.make} ${props.model}`} />
        </div>
        <div className={classes.content}>
          <h3>{`${props.color} ${props.make} ${props.model}`}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default Car;
