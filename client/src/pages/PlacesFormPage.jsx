import { useEffect, useState } from "react";
import Perks from '../Perks';
import PhotosUploader from '../PhotosUploader';
import AccountNav from "../AccountNav";
import axios from 'axios';
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
  const {id} = useParams();

  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [maxGuests,setMaxGuests] = useState(1);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirect,setRedirect] = useState(false);
  const [price,setPrice] = useState(1);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/'+id).then(response => {
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  },[id]);

  function inputHeader(text) {
    return (
      <h2 className='text-2xl mt-4'>{text}</h2>
    )
  }

  function inputDescription(text) {
    return (
      <p className='text-gray-500 text-sm'>{text}</p>
    )
  }
  
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
    };

    if (id) {
      //update
      await axios.put('/places', {
        id,
        ...placeData
      });
      setRedirect(true);
    } else {
      //new place
      await axios.post('/places', {
        ...placeData
      });
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput('Title', 'Title for your place should be short and catchy as in adverdisment.')}
          <input 
            type='text'
            placeholder='title, for example: My lovely apartment.'
            value={title}
            onChange={ev => setTitle(ev.target.value)}
          />
          {preInput('Address','Full address info to reach your place.')}
          <input 
            type='text'
            placeholder='address'
            value={address}
            onChange={ev => setAddress(ev.target.value)}
          />
          {preInput('Photos','Photos you taken of your place. More = Better.')}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {preInput('Description','Description about your place.')}
          <textarea 
            className=''
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
          {preInput('Perks','Select all the perks of your place.')}
          <Perks selected={perks} onChange={setPerks} />
          {preInput('Extra Info','Additional informations about your appartment.')}
            <textarea     
              className=''
              value={extraInfo}
              onChange={ev => setExtraInfo(ev.target.value)}
            />
            {preInput('Check in&out times','Add check in and out times, remember about giving time to clean room between guests.')}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
              <div>
                <h3 className='mt-2 -mb-1'>Check in time</h3>
                <input  
                  type='text'
                  placeholder='14:00' 
                  value={checkIn}
                  onChange={ev => setCheckIn(ev.target.value)}
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Check out time</h3>
                <input  
                  type='text'
                  placeholder='9:00'
                  value={checkOut}
                  onChange={ev => setCheckOut(ev.target.value)}
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                <input  
                  type='number'
                  value={maxGuests}
                  onChange={ev => setMaxGuests(ev.target.value)} 
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Price per night</h3>
                <input  
                  type='number'
                  value={price}
                  onChange={ev => setPrice(ev.target.value)} 
                />
              </div>
            </div>
          <button className='primary my-4'>Save</button>
        </form>
      </div>
    </>
  )
}

export default PlacesFormPage