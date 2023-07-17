//square brackets in the filename signify a dynamic page in nextjs
//that will load for different values in the path
import CarDetail from "../components/cars/CarDetail"
import {MongoClient, ObjectId} from "mongodb"
import Head from "next/head"
const carDetails = (props) => {

        //using the carData from getStaticProps to dynamically render detail pages
        return(<>
                <Head>
                <title>{props.carData.make} {props.carData.model} Details</title>
                <meta name = "description" content = {`Details for ${props.carData.make} ${props.carData.model}`}/>
                </Head> 
                
                <CarDetail
                image={props.carData.image}
                color={props.carData.color}
                make={props.carData.make}
                model={props.carData.model}
                description={props.carData.description}
        />

        </>
        )

}

//function understood by nextjs that is needed for a dynamic page using getStaticProps()
//not needed for getServerSideProps
//returns object to describe all dynamic values for the page

export async function getStaticPaths() {
  const dotenv = require("dotenv")
  dotenv.config()
        const client = await MongoClient.connect(
          `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9qdbulj.mongodb.net/cars?retryWrites=true&w=majority`
              );
              const db = client.db();
            
              const carCollection = db.collection('cars');
            
              const cars = await carCollection.find({}, { _id: 1 }).toArray();
              console.log(cars)
            
              client.close();
            
              return {
                fallback: 'blocking',
                paths: cars.map((car) => ({
                  params: { carId: car._id.toString() },
                })),
              };


}

//since the data is not changing very often(multiple times per second) and we dont need request/response object
//we use getStaticProps() to provide data for page pre-render
//context in getStaticProps doesnt have request/response. has param object 
//nextjs generates all versions of this page pre-render
export async function getStaticProps(context) {
        //since this is a dynamic page, when a fetch is done for a car, need a way to identify that car
        //for this reason, ID property is encoded into url on show details page
        //carId is the identifier of the page so it is used on params to get actual ID
        const dotenv = require("dotenv")
        dotenv.config()
        const carId = context.params.carId;

        const client = await MongoClient.connect(
          `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9qdbulj.mongodb.net/cars?retryWrites=true&w=majority`
        );
        const db = client.db();
      
        const carCollection = db.collection('cars');
      
        const selectedCar = await carCollection.findOne({
          _id: new ObjectId(carId),
        });
        client.close();
      
        return {
          props: {
            carData: {
              id: selectedCar._id.toString(),
              make: selectedCar.make,
              model: selectedCar.model,
              image: selectedCar.image,
              color: selectedCar.color,
              description: selectedCar.description,
            },
          },
        };
}

export default carDetails