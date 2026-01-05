import React, { useEffect, useState } from 'react'
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import { apiUrl, fileUrl, token } from '../common/http';
import { Link } from 'react-router-dom';
import DefaultImage from '../../assets/images/default-article.jpg';

const Blogs = () => {
   const[articles, setArticles] = useState([])
   
   const fetchLatestArticles = async () => {
      const res = await fetch(apiUrl+'get-latest-articles', {
         'method' : 'GET'
      });
      const result = await res.json();
      // console.log(result);
      setArticles(result.data);
   }

   useEffect(() => {
      fetchLatestArticles()
   }, []);

   return (
   <>
      <Header/>
      <main>
         <Hero preHeading='Learn. Explore. Inspire.'
         heading='Blogs'
         text='Stay updated with expert blogs on computer repair, CCTV systems,
               networking, and smart IT solutions for home and business users.'
         />
         <section className='section-6 bg-light py-5'>
               <div className='container'>
                  <div className='section-header text-center'>
                     <span>Blog & News</span>
                     <h2>Articles & Blog Posts</h2>
                     <p>Discover our wide variety of computer repair, networking, and IT service projects tailored for homes and businesses.</p>
                  </div>
                  <div className='row pt-3'>
                     {
                        articles && articles.map(article => {
                           return (
                              <div key={`article-${article.id}`} className='col-md-4 mb-3'>
                                    <div className='card shadow border-0'>
                                       <div className='card-img-top'>
                                          {/* <img src={`${fileUrl}uploads/articles/small/${article.image}`} alt="" className='w-100' /> */}
                                          <img
                                             src={
                                                article?.image
                                                ? `${fileUrl}uploads/articles/small/${article.image}`
                                                : DefaultImage
                                             }
                                             alt=""
                                             className='w-100'
                                          />
                                       </div>
                                       <div className='card-body p-4'>
                                          <div className='mb-3'>
                                             <Link to={`/blog/${article.id}`} className='title'>{article.title}</Link>
                                          </div>
                                          <div>
                                             <Link to={`/blog/${article.id}`} className='btn btn-primary small'>Read More</Link>
                                          </div>
                                       </div>
                                    </div>
                              </div>
                           )
                        })
                     }
                  </div>
               </div>
         </section>
      </main>
      <Footer/>
   </>
   )
}

export default Blogs