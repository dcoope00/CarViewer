import styles from "./CarDetail.module.css"


const CarDetail = (props) => {


    return <section className = {styles.detail}>

        <img src= {props.image}
            alt= {`${props.color} ${props.make} ${props.model}`} />
        <h1>{`${props.color} ${props.make} ${props.model}`}</h1>
        <p>{props.description}</p>
    </section>

}

export default CarDetail