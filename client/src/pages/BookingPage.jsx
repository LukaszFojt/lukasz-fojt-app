import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';
import PlaceLink from '../PlaceLink';
import PlacesGallery from "../PlacesGallery";
import { format, differenceInCalendarDays } from 'date-fns';
import AccountNav from "../AccountNav";

const BookingPage = () => {

  const {id} = useParams();
  const [booking,setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        };
      });
    };
  }, [id]);

  if (!booking) {
    return 'Loading ...';
  };

  return (
    <div>
      <AccountNav />
      <h1 className='text-2xl my-8'>{booking.place.title}</h1>
      <PlaceLink className='my-2 block'>{booking.place.address}</PlaceLink>
      <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
        <h2 className="text-xl">
          Your booking information: 
        </h2>
        <div className="border-t border-gray-300 mt-2 py-2">
          {format(new Date(booking.checkIn), 'yyyy-MM-dd')} 
          &rarr; 
          {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
        </div>
        <div className="text-lg">
          Number of days: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} 
          <br />
          Total price: ${booking.price}
        </div>
      </div>
      <PlacesGallery place={booking.place} />
    </div>
  )
}

export default BookingPage