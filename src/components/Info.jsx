import React from 'react'
import AppContext from '../context';

export const Info = ({title, description, image}) => {
const {setCardOpened} = React.useContext(AppContext);

  return (
    <div className='emptyCart'>
        <img width="120px" src={image} alt='Empty'/>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => setCardOpened(false)} className="gButton">
            Back
        </button>
    </div>
  )
}

export default Info;