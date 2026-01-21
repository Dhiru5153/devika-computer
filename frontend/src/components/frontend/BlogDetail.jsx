import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Hero from '../common/Hero';
import Footer from '../common/Footer'
import { Link, useParams } from 'react-router-dom';
import { apiUrl, fileUrl } from '../common/http'
import ShowTestimonials from '../common/ShowTestimonials';
import { Commet } from "react-loading-indicators";

const styles = {
   overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.35)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
   }
};


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
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth"
      });
      fetchArticle()
      fetchLatestArticles();
      const timer = setTimeout(() => {
         setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
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
         <main
            style={{
               filter: loading ? "blur(4px)" : "none",
               transition: "filter 0.3s ease",
               pointerEvents: loading ? "none" : "auto"
            }}
         >
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
                           {/* {loading && (
                              <div className="text-center py-4">
                                 <div className="spinner-border text-primary" role="status"></div>
                              </div>
                           )} */}

                           {!loading && article.length === 0 && (
                              <div className="text-center py-4">
                                 No blog found
                              </div>
                           )}

                           { !loading && article?.video ? (
                              <div className="w-100 h-100">
                                 <div className="ratio ratio-16x9">
                                    <iframe
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                                    title="YouTube video"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    ></iframe>
                                 </div>
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
            <section className='section-11 bg-light'>
               <ShowTestimonials/>
            </section>
         </main>
         {loading && (
            <div style={styles.overlay}>
               <Commet
               color="#0d6efd"
               size="large"
               text="PLEASE WAIT"
               textColor="#0d6efd"
               />
            </div>
         )}
         <Footer/>
      </>
   )
}

export default BlogDetail