import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { fetch } from "../../services/services";
import Article from "../Article";
import Carousel from 'react-bootstrap/Carousel';
import Breadcrumbs from "../Breadcrumbs";


const ArticleScreen = (props) => {

  const { id } = useParams();


  const [article, setArticle] = useState({});
  const [articleSuggestions, setArticleSuggestions] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`article-screen/${id}`)
        .then(response => {
          setArticle(response.data.article);
          setArticleSuggestions(response.data.articleSuggestions);
        });
    }
  }, [id]);

  return (
    <div>
      <Breadcrumbs
        Items={[
          { href: '/', text: 'Home' },
          { href: '/articles', text: 'Articles' },
          { text: article.title }
        ]}
      />
      
      <div>
        <h1 className="font-lora font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4">
          <img className="w-12 h-12 rounded-full" src={`${process.env.REACT_APP_API}/assets/media/images/articles/${article.images && article.images[0].image}`} alt={article.title} />
          <div>
            <p className="m-0" >{"By Peterborough Nepalese Society"}</p>
            <time>{article.date}</time>
          </div>
        </div>
        <p className="mt-8 mb-4">{article.text}</p>

        <Carousel>
          {article.images && article.images.map((image) =>
            <Carousel.Item>
              <img key={image.id} src={`${process.env.REACT_APP_API}/assets/media/images/articles/${image.image}`} alt={image.title} />

              {/* <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption> */}
            </Carousel.Item>
          )}
        </Carousel>




      </div>
      <div>
        <h2 className="mt-16 mb-4 font-lora">Related Articles</h2>
        <div className="grid grid-cols-4 gap-8">
          {articleSuggestions?.map((article) => (
            <Article
              key={article.id}
              id={article.id}
              images={article.images}
              title={article.title}
              date={article.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleScreen;