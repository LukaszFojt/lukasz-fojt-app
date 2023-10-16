import { differenceInCalendarDays } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from "react-router-dom"
import { UserContext } from './UserContext.jsx';
import axios from 'axios';

const BookingWidget = ({place}) => {

  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [numberOfGuests,setNumberOfGuests] = useState(1);
  const [name,setName] = useState('');
  const [mobile,setMobile] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  };

  async function bookThisPlace() {
    const response = await axios.post('/bookings', {
      checkIn, checkOut, 
      numberOfGuests, name, 
      mobile, place: place._id, price: numberOfDays * place.price
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <div className='border py-4 px-4 rounded-2xl bg-sky-50'>
        <label>
          Check in date: 
        </label>
        <input 
          type="date"
          value={checkIn}
          onChange={ev => setCheckIn(ev.target.value)}
        />
      </div>
      <div className='border py-4 px-4 rounded-2xl bg-sky-50'>
        <label>
          Check out date: 
        </label>
        <input 
          type="date"
          value={checkOut}
          onChange={ev => setCheckOut(ev.target.value)}
        />
      </div>
      <div>
        <label>
          Number of guests:
        </label>
        <input
          type="number"
          value={numberOfGuests}
          onChange={ev => setNumberOfGuests(ev.target.value)}
        />
        {numberOfDays > 0 && (
          <div className='py-3 px-4'>
            <label>Your fullname</label>
            <input 
              type='text' placeholder='john doe'
              value={name}
              onChange={ev => setName(ev.target.value)}
            />
            <label>Your phone number</label>
            <input 
              type='text' placeholder='+00 000 000 000'
              value={mobile}
              onChange={ev => setMobile(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button
        onClick={bookThisPlace} 
        className='primary mt-4'>
        Book this place
        {numberOfDays > 0 && (
          <span> ${numberOfDays * place.price}</span>
        )}
      </button>
    </div>
  )
}

export default BookingWidget