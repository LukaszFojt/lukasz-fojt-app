import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from "react-router-dom";

const BookingsPage = () => {

  const [bookings,setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <Link
            key={booking._id} 
            to={`/account/bookings/${booking._id}`}
            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
            <div className="">
              <PlaceImg place={booking.place} />
            </div>
            <div className="py-3 grow pr-3">
              <h2 className="text-xl">{booking.place.title}</h2>
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
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage