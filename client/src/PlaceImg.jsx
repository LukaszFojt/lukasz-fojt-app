
const Image = ({src, ...rest}) => {
  src = src && src.includes('https://') 
  ? src 
  : 'http://localhost:4000/uploads/'+src;

  return (
    <img 
      {...rest} 
      src={src}
      alt={''}
    />
  )
}

const PlaceImg = ({place, index=0, className=null}) => {

  if (!place.photos?.length) {
    return '';
  };

  if (!className) {
    className = 'w-32 h-32'
  }

  return (
    <Image
      className={className}
      src={place.photos[index]} 
      alt="photo" 
    />
  )
}

export default PlaceImg