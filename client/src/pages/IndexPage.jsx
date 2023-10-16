import { useEffect, useState } from "react"
import axios from 'axios';
import {Link} from 'react-router-dom';
import Image from '../Image';

const IndexPage = () => {

  const [places,setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  },[]);

  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {places.length > 0 && places.map(place => (
        <Link 
          key={place._id}
          to={'/place/'+place._id}>
          <div
            className="flex flex-col w-full h-[400px] border border-gray-500 rounded-2xl mb-2"
          >
            {place.photos?.[0] && (
              <Image 
                className="w-full h-2/3 rounded-2xl
                rounded-b-none object-cover aspect-square
                border-b border-gray-500"
                src={place.photos?.[0]}
                alt='photo'
              />
            )}
            <h2 className="font-bold truncate">{place.address}</h2>
            <h3 className="text-sm leading-3">{place.title}</h3>
            <div>
              <span className="font-bold">${place.price} </span>
              per night
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default IndexPage