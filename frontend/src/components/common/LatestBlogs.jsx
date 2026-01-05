import React, { useEffect, useState } from 'react'
import { apiUrl, fileUrl, token } from '../common/http';
import { Link } from 'react-router-dom';
import DefaultImage from '../../assets/images/default-article.jpg';


const LatestBlogs = () => {
   const[articles, setArticles] = useState([])
   
   const fetchLatestArticles = async () => {
      const res = await fetch(apiUrl+'get-latest-articles?limit=4', {
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
      <section className='section-6 bg-light py-5'>
         <div className='container-fluid py-5'>
            <div className='section-header text-center'>
               <span>Blog & News</span>
               <h2>Articles & Blog Posts</h2>
               <p>Discover our wide variety of computer repair, networking, and IT service projects tailored for homes and businesses.</p>
            </div>
            <div className='row pt-3'>
               {
                  articles && articles.map(article => {
                     return (
                        <div key={`article-${article.id}`} className='col-md-3 mb-3'>
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
               {/* <div className='col-md-4'>
                     <div className='card shadow border-0'>
                        <div className='card-img-top'>
                           <img src={BlogImg} alt="" className='w-100' />
                        </div>
                        <div className='card-body p-4'>
                           <div className='mb-3'>
                                 <a href="#" className='title'>Dummy Blog Title</a>
                           </div>
                           <div>
                                 <a href="#" className='btn btn-primary small'>Read More</a>
                           </div>
                        </div>
                     </div>
               </div>
               <div className='col-md-4'>
                     <div className='card shadow border-0'>
                        <div className='card-img-top'>
                           <img src={BlogImg} alt="" className='w-100' />
                        </div>
                        <div className='card-body p-4'>
                           <div className='mb-3'>
                                 <a href="#" className='title'>Dummy Blog Title</a>
                           </div>
                           <div>
                                 <a href="#" className='btn btn-primary small'>Read More</a>
                           </div>
                        </div>
                     </div>
               </div> */}
            </div>
         </div>
      </section>
   )
}

export default LatestBlogs