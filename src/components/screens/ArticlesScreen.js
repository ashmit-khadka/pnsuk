import React, { useState, useEffect } from "react";
import axios from "axios";
import Article from "../Article";
import { ReactComponent as IconTeam } from '../../assets/icons/noun-team.svg';
import { ReactComponent as IconHeart } from '../../assets/icons/noun-heart.svg';
import { ReactComponent as IconTrophy } from '../../assets/icons/noun-trophy.svg';
import { ReactComponent as IconUnderline } from '../../assets/icons/noun-underline.svg';
import ImageEvents from '../../assets/images/pexels-diohasbi-3280130.jpg'; // Import the JPG image
import Button from 'react-bootstrap/Button';
import Breadcrumbs from '../Breadcrumbs'

const ArticlesScreen = () => {

  const [articles, setArticles] = useState({
    articles: {
      items: [],
      viewAll: false
    },
    donations: {
      items: [],
      viewAll: false
    },
    sports: {
      items: [],
      viewAll: false
    },
  });


  useEffect(() => {
    axios.get('http://localhost:3001/articles')
      .then((response) => {
        const articles = response.data;
        const donations = response.data.filter(article => article.is_aid);
        const sports = response.data.filter(article => article.is_sport);
        setArticles({
          articles: { ...articles.articles, items: articles },
          donations: { ...articles.donations, items: donations },
          sports: { ...articles.sports, items: sports }
        });
      })
  }, []);

  const section = (type, Icon, title, description, numberToDisplay) => (
    <div className="mt-12 mb-24">
      <div className="bg-gradient-to-r from-themeDark to-themePrimary text-white p-12 relative mb-12 rounded-lg">
        <div className="flex gap-4">
          <Icon className="w-24 h-24 fill-current text-themeLight" />
          <div className="w-1/2">
            <h2 className="font-bold w-max relative mb-4">
              {title}
              <IconUnderline className="absolute left-0 top-8 w-full fill-current text-themeLight" />
            </h2>
            <p className="m-0">{description}</p>
          </div>
        </div>
        <img src={ImageEvents} alt="Events" className="hidden md:block w-48 h-48 rounded-full absolute right-24 bottom-12" /> {/* Use the imported image */}

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {articles[type].items.slice(0, articles[type].viewAll ? articles.length : numberToDisplay).map(article => (
          <Article
            key={article.id}
            id={article.id}
            images={article.images}
            title={article.title}
            date={article.date}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          className="mt-8"
          onClick={() => {
            setArticles({
              ...articles,
              [type]: {
                ...articles[type],
                viewAll: !articles[type].viewAll
              }
            });
          }}
        >{articles[type].viewAll ? 'View less' : 'View more'}</Button>
      </div>

    </div>
  );

  return (
    <div >
      <Breadcrumbs
        Items={[
          { href: '/', text: 'Home' },
          { href: '/articles', text: 'Articles' }
        ]}
      />

      <h1 className="font-lora mb-8 text-center">Articles</h1>


      {section(
        'articles',
        IconTeam,
        'Our latest events',
        'Take a look at our latest events and activities that we have hosted. We are proud to share our journey with you.',
        6,
      )}
      {section(
        'donations',
        IconHeart,
        'Donations',
        'Donations are a vital part of our work. We are grateful for the support we receive from our community.',
        3
      )}
      {section(
        'sports',
        IconTrophy,
        'Sports',
        'We are proud to host a range of sports activities for our community. Take a look at our latest sports events.',
        3
      )}
    </div>
  );
}

export default ArticlesScreen;