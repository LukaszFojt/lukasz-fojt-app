import { useState } from "react";
import Image from './Image';

const PlacesGallery = ({place}) => {

  const [showAllPhotos,setShowAllPhotos] = useState(false);

  
  if (showAllPhotos) {
    return (
      <div className='absolute bg-white min-h-screen inset-0'>
        <div className='p-8 grid gap-4'>
          <div>
            <h2 className='text-3xl'>Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className='fixed bg-primary rounded-full w-8 h-8 text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-white p-1">
                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          {place?.photos?.length > 0 && place.photos.map(photo => (
            <Image
              key={photo} 
              className='w-full'
              src={photo} 
              alt='photo'
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='relative'>
      <div className='grid gap-2 grid-cols-[2fr_1fr]'>
        <div>
          {place.photos?.[0] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className='aspect-square w-full object-cover rounded-l-3xl cursor-pointer'
              src={place.photos?.[0]}
              alt='photo'
            />
          )}
        </div>
        <div className='flex flex-col gap-2'>
          {place.photos?.[1] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className='object-cover h-2/5 cursor-pointer' 
              src={place.photos?.[1]}
              alt='photo'
            />
          )}
          {place.photos?.[2] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className='object-cover h-3/5 cursor-pointer' 
              src={place.photos?.[2]}
              alt='photo'
            />
          )}
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}   
        className='flex gap-1 absolute bg-primary text-white text-sm items-center bottom-1 right-0 py-2 px-2 rounded-2xl rounded-r-none border border-red-900 shadow-md shadow-gray-500 opacity-80'
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
        </svg>
        Show more photos
      </button>
    </div>
  )
}

export default PlacesGallery