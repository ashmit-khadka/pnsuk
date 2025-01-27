import React from 'react';

const Member = (props) => {
  const { name, position, image, imageSize } = props;
  return (
    <div className="member-card flex flex-col items-center">
      <img 
        className={`member-image ${ imageSize === 'large' ? 'w-48 h-48' : 'w-32 h-32' } rounded-full object-cover mb-3 object-cover`}
        src={`${process.env.REACT_APP_HOST}/assets/media/images/committee/${image}`} 
        alt={name} />
      <p className="font-bold text-lg m-0">{name}</p>
      <p className='font-medium'>{position}</p>
    </div>
  );
}

export default Member;