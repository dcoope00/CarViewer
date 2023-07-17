import NewCarForm from "../components/cars/NewCarForm"
import {useRouter} from "next/router"
import Head from "next/head"
const NewCar = props =>{
    const router = useRouter()

    const addCarHandler = (carData) =>{
        fetch("/api/new-car",{
            method: "POST",
            body: JSON.stringify(carData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

        })
        router.push("/")
    }

    return (<>
     <Head>
        <title>Add a Car</title>
        <meta name = "description" content = "Add new cars for viewing to the database"/>
        </Head>
        <NewCarForm onAddCar = {addCarHandler} />
        </>
    )

}

export default NewCar