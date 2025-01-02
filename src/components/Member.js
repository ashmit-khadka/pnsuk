import React from 'react';

const Member = (props) => {
  const { name, position, image } = props;
  return (
    <div className="member-card flex flex-col items-center">
      <img 
        className="member-image w-32 h-32 rounded-full object-cover mb-4 object-cover"
        src={`http://localhost:3000/assets/media/images/committee/${image}`} 
        alt={name} />
      <h3 className="font-bold text-lg m-0">{name}</h3>
      <p>{position}</p>
    </div>
  );
}

export default Member;