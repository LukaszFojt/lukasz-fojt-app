
const Perks = ({selected, onChange}) => {

  function handleCbClick(ev) {
    // alert(ev);
    // console.log(ev.target.checked);
    const {checked,name} = ev.target;
    if (checked) {
      onChange([...selected, name])
    } else {
      onChange([...selected.filter(selectedName => selectedName !== name)])
    }
  }

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        <label className='perk'>
          <input    
            type='checkbox'
            onChange={handleCbClick}
            name='wifi'
            checked={selected.includes('wifi')}
          />
          <span>Wifi</span>
        </label>
        <label className='perk'>
          <input  
            type='checkbox'
            onChange={handleCbClick}
            name='parking'
            checked={selected.includes('parking')}
          />
          <span>Free parking</span>
        </label>
        <label className='perk'>
          <input 
            type='checkbox'
            onChange={handleCbClick}
            name='tv' 
            checked={selected.includes('tv')}
          />
          <span>TV</span>
        </label>
        <label className='perk'>
          <input 
            type='checkbox'
            onChange={handleCbClick}
            name='pets'
            checked={selected.includes('pets')}
          />
          <span>Pets</span>
        </label>
        <label className='perk'>
          <input 
            type='checkbox'
            onChange={handleCbClick}
            name='entrance'
            checked={selected.includes('entrance')}
          />
          <span>Entrance</span>
        </label>
        <label className='perk'>
          <input 
            type='checkbox'
            onChange={handleCbClick}
            name='radio'
            checked={selected.includes('radio')}
          />
          <span>Radio</span>
        </label>
      </div>
      
    </>
  )
}

export default Perks