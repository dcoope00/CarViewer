import CarList from "../components/cars/CarList"
import { MongoClient } from "mongodb"
import Head from "next/head"

const HomePage = props => {



    return (
        <>
        <Head>
        <title>React Car Viewer</title>
        <meta name = "description" content = "A demo React/Next.js project"/>
        </Head>
        <CarList cars={props.cars} />
        </>
    )

}
//this function only works in page component files
//It prepares props for the page to load data before the component function is executed
//so it can be rendered with the required data
//code in this function is executed during build process. Will never execute on client side
//must return an object that is usually props object that is recieved in component function
//good for SEO because data is fetched during build process instead of 2nd component render cycle
//be careful of outdated data. needs npm run build again if pre-rendered data changes or use revalidate property 

export async function getStaticProps() {
    const dotenv = require("dotenv")
    dotenv.config()
    const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9qdbulj.mongodb.net/cars?retryWrites=true&w=majority`)
    const db = client.db()
    const carCollection = db.collection("cars")


    const cars = await carCollection.find().toArray()
    client.close()
    return {
        props: {
            cars: cars.map((car) => {
                return {
                    make: car.make,
                    model: car.model,
                    color: car.color,
                    image: car.image,
                    id: car._id.toString()
                }

            })
        },
        //this property allows incremental static generation. requires a number that is
        //# of seconds nextJS will wait to re pre-generate page on server for incoming request
        //good for not rebuilding/redeploying just for changed data
        revalidate: 1
    }
}
//------------------------------------------------------
//this function runs on the server after deployment. Never on client
//returns an object with a props property
//both functions receive context parameter. only getServerSideProps has a request and response object
//disadvantage to getStaticProps() -running for every request means client must wait for page generation on every request
//only use this if access to request/responseor if data is changing multiple times per second. otherwise getStaticProps() 

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res

//     //could fetch, read data from file system, do stuff with credentials that users shouldnt see, etc
//     //several similarities to getStaticProps()
//     //runs for every incoming request so no revalidate property
//     return {
//         props: {
//             cars: dummy_cars
//         }
//     }
// }

export default HomePage