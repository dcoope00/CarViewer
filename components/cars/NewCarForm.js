import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewCarForm.module.css';

function NewCarForm(props) {
  const makeRef = useRef()
  const modelRef = useRef()
  const imageRef = useRef()
  const colorRef = useRef()
  const descriptionRef = useRef()

  function submitHandler(event) {
    event.preventDefault()

    const enteredMake = makeRef.current.value
    const enteredModel = modelRef.current.value
    const enteredImage = imageRef.current.value
    const enteredColor = colorRef.current.value
    const enteredDescription = descriptionRef.current.value

    const carData = {
      make: enteredMake,
      model: enteredModel,
      image: enteredImage,
      color: enteredColor,
      description: enteredDescription,
    };

    props.onAddCar(carData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='make'>Make</label>
          <input type='text' required id='make' ref={makeRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='model'>Model</label>
          <input type='text' required id='model' ref={modelRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='color'>Color</label>
          <input type='text' required id='color' ref={colorRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Car Image</label>
          <input type='url' required id='image' ref={imageRef} />
        </div>
        
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Car</button>
        </div>
      </form>
    </Card>
  );
}

export default NewCarForm;
