import React from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment';

const Article = (props) => {
  const {
    id,
    images,
    title,
    date,
  } = props;

  const navigate = useNavigate();

  const onArticleClick = () => {
    navigate(`/article/${id}`);
  }

  console.log(`http://localhost:3000/assets/media/article/${images[0]?.image}`);

  return (
    <div className="w-full flex flex-col cursor-pointer group font-raleway" onClick={onArticleClick}>
      <div className="overflow-hidden">
        <img className="w-full w-full h-48 rounded-lg mb-2 object-cover transform transition-transform duration-300 group-hover:scale-110" src={`http://localhost:3000/assets/media/article/${images[0]?.image}`} alt="placeholder" />
      </div>
      <h3 className="text-lg font-bold m-0 group-hover:underline">{title}</h3>
      <time dateTime={date}>{moment(date).fromNow()}</time>
    </div>
  );
}

export default Article;