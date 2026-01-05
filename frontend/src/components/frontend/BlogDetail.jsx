import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Hero from '../common/Hero';
import Footer from '../common/Footer'
import { Link, useParams } from 'react-router-dom';
import { apiUrl, fileUrl } from '../common/http'
import ShowTestimonials from '../common/ShowTestimonials';

const BlogDetail = () => {

   const[article, setArticle] = useState([])
   const[latestArticles, setLatestArticles] = useState([])
   const params = useParams();
   const [loading, setLoading] = useState(false);
   
   const fetchArticle = async () => {
      setLoading(true);
      try {
         const res = await fetch(`${apiUrl}get-article/${params.id}`, {
            'method' : 'GET'
         });
         const result = await res.json();
         // console.log(result);
         setArticle(result.data);
      } catch (error) {
         toast.error("Failed to load blog");
      } finally {
         setLoading(false);
      }
   }
   
   const fetchLatestArticles = async () => {
      const res = await fetch(`${apiUrl}get-latest-articles`, {
         'method' : 'GET'
      });
      const result = await res.json();
      // console.log(result);
      setLatestArticles(result.data);
   }
   useEffect(() => {
      fetchArticle()
      fetchLatestArticles();
   }, [params.id]);

   const videoId = article?.video ? getYoutubeId(article.video) : null;
   const [play, setPlay] = useState(false);
   function getYoutubeId(url) {
      const regExp =
         /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
      const match = url.match(regExp);
      return match ? match[1] : null;
   }

   return (
      <>
         <Header/>
         <main>
            <Hero preHeading='Innovation. Expertise. Trust.'
            heading='Blog & News'
            text=''
            />
            <section className='section-11'>
               <div className='container py-5'>
                  <div className='row'>
                     <div className='col-md-8'>
                        <h2>{article.title}</h2>
                        <div className='pb-3'>by <strong>{article.author}</strong> on {article.created_at}</div>
                        
                        {/* Video */}
                        <div className='pe-md-5 pb-3'>
                           {loading && (
                              <div className="text-center py-4">
                                 <div className="spinner-border text-primary" role="status"></div>
                              </div>
                           )}

                           {!loading && article.length === 0 && (
                              <div className="text-center py-4">
                                 No blog found
                              </div>
                           )}

                           { !loading && article?.video ? (
                              <div className="w-100 h-100">
                                 {!play ? (
                                    <div
                                       className="position-relative cursor-pointer"
                                       onClick={() => setPlay(true)}
                                    >
                                       {/* Poster */}
                                       <img
                                       src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                       alt="YouTube Poster"
                                       className="img-fluid w-100 h-100 rounded"
                                       />

                                       {/* Play Icon */}
                                       <span
                                       className="position-absolute top-50 start-50 translate-middle 
                                                   fs-1 text-white bg-dark bg-opacity-50 
                                                   rounded-circle d-flex align-items-center 
                                                   justify-content-center"
                                       style={{ width: "80px", height: "80px" }}
                                       >
                                       ▶
                                       </span>
                                    </div>
                                 ) : (
                                    <div className="ratio ratio-16x9">
                                       <iframe
                                       src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                                       title="YouTube video"
                                       allow="autoplay; encrypted-media"
                                       allowFullScreen
                                       ></iframe>
                                    </div>
                                 )}
                                 </div>
                           ) : !loading && article?.image ? (
                              <img
                                 src={`${fileUrl}uploads/articles/large/${article.image}`}
                                 alt={article.title || "Article Image"}
                                 className="w-100"
                              />
                           ) : null}
                        </div>
                        {!loading && article?.content && (
                           <div  dangerouslySetInnerHTML={{ __html: article.content }}></div>
                        )}
                     </div>
                     <div className='col-md-4 mb-3'>
                        <div className='card shadow border-0 sidebar'>
                           <div className='card-body px-5 py-4'>
                              <h3 className='mt-2 mb-3'>Latest Blogs</h3>
                              {
                                 latestArticles && latestArticles.map(article => {
                                    return (
                                       <div className='d-flex border-bottom mb-3 pb-2'>
                                          <div className='pe-3 pb-2'>
                                             <Link to={`/blog/${article.id}`}>
                                                <img src={`${fileUrl}uploads/articles/small/${article.image}`} alt="" width={100} />
                                             </Link>
                                          </div>
                                          <Link to={`/blog/${article.id}`} className='title'>{article.title}</Link>
                                          <hr />
                                       </div>
                                    )
                                 })
                              }
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className='section-11 bg-light py-5'>
               <ShowTestimonials/>
            </section>
         </main>
         <Footer/>
      </>
   )
}

export default BlogDetail