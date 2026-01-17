import React, { useEffect, useState } from 'react'
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import { apiUrl, fileUrl, token } from '../common/http';
import { Link } from 'react-router-dom';
import DefaultImage from '../../assets/images/default-article.jpg';
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

const Blogs = () => {
   const[articles, setArticles] = useState([])
   const [loading, setLoading] = useState(true);
   
   const fetchLatestArticles = async () => {
      const res = await fetch(apiUrl+'get-latest-articles', {
         'method' : 'GET'
      });
      const result = await res.json();
      // console.log(result);
      setArticles(result.data);
   }

   useEffect(() => {
      fetchLatestArticles();
      const timer = setTimeout(() => {
         setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
   }, []);

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
         <Hero preHeading='Learn. Explore. Stay Updated.'
         heading='Tech Blogs & Insights'
         text='Read expert articles on computer & laptop repair, CCTV installation,
               networking solutions, and smart IT tips to keep your home and business running smoothly.'
         />
         <section className='section-6 bg-light py-5'>
               <div className='container'>
                  <div className='section-header text-center'>
                     <span>Tech Blog & Updates</span>
                     <h2>Computer Service Articles & Tips</h2>
                     <p>
                        Explore informative blogs covering computer repairs, IT support,
                        CCTV security systems, networking solutions, and the latest
                        technology trends for homes and businesses.
                     </p>
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

export default Blogs