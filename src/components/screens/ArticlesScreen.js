import React, { useState, useEffect } from "react";
import axios from "axios";
import Article from "../Article";
import { ReactComponent as IconTeam } from '../../assets/icons/noun-team.svg';
import { ReactComponent as IconHeart } from '../../assets/icons/noun-heart.svg';
import { ReactComponent as IconTrophy } from '../../assets/icons/noun-trophy.svg';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

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
        console.log(response.data);
      })
  }, []);

  const section = (type, Icon, title, description, numberToDisplay) => (
    <div className="mb-8">
      <div className="py-2 flex gap-4 mb-4">
        <Icon className="section-icon" />
        <div>
          <h2 className="font-lora font-bold" >{title}</h2>
          <p>{description}</p>

        </div>
      </div>
      <div className="grid grid-cols-4 gap-12">
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
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Articles</Breadcrumb.Item>
      </Breadcrumb>

      {section(
        'articles',
        IconTeam,
        'Our latest events',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        8,
      )}
      {section(
        'donations',
        IconHeart,
        'Donations',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        4
      )}
      {section(
        'sports',
        IconTrophy,
        'Sports',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        4
      )}
    </div>
  );
}

export default ArticlesScreen;