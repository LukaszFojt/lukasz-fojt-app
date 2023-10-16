import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../BookingWidget';
import PlaceLink from '../PlaceLink';
import PlacesGallery from '../PlacesGallery';

const PlacePage = () => {
  const {id} = useParams();
  const [place,setPlace] = useState(null);
  const [showAllPhotos,setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return '';
  }

  return (
    <div className='mt-8 bg-gray-100 -mx-8 px-8'>
      <h1 className='text-2xl'>{place.title}</h1>
      <PlaceLink>{place.address}</PlaceLink>
      <PlacesGallery place={place} />
      <p className='my-4 font-light'>{place.description}</p>
      <div>
        {place.perks}
      </div>
      <p className='my-4 font-light'>{place.extraInfo}</p>
        <div className='grid grid-cols-2'>
        <div className='mx-auto flex flex-col gap-2'>
          <h3 className='font-light'>Check in time: <span className='font-semibold'>
            {place.checkIn}
          </span></h3>
          <h3 className='font-light'>Check out time: <span className='font-semibold'>
            {place.checkOut}
          </span></h3>
          <h3 className='font-light'>Maximum number of guests: <span className='font-semibold'>
            {place.maxGuests}
          </span></h3>
          <div    
          className='font-light'>
            Price: 
            <span   
              className='font-semibold'>
              ${place.price} 
            </span> / per night
          </div>
        </div>
        <BookingWidget place={place}/>
      </div>
    </div>
  )
}

export default PlacePage