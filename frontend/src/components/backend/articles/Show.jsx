import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Sidebar from '../../common/Sidebar'
import { apiUrl, token } from '../../common/http'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
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

const Show = () => {
   const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);

   const fetchArticles = async () =>{
      setLoading(true);
      try {
         const res = await fetch(apiUrl+'articles', {
            'method' : 'GET',
            'headers' : {
               'Content-type' : 'application/json',
               'Accept' : 'application/json',
               'Authorization' : `Bearer ${token()}`
            }
         });
         const result = await res.json();
         setArticles(result.data);
      } catch (error) {
         toast.error("Failed to load articles");
      } finally {
         setLoading(false);
      }
   }

   const deleteArticle = async (id) => {
      if (confirm("Are you sure you want to delete?")){
         setLoading(true);
         try {
            const res = await fetch(apiUrl+'articles/'+id, {
               'method' : 'DELETE',
               'headers' : {
                  'Content-type' : 'application/json',
                  'Accept' : 'application/json',
                  'Authorization' : `Bearer ${token()}`
               }
            });
            const result = await res.json();

            if (result.status == true) {
               const newArticles = articles.filter(article => article.id != id)
               setArticles(newArticles)
               toast.success(result.message)
            } else {
               toast.error(result.message)
            }
         } catch (error) {
            toast.error("Delete failed");
         } finally {
            setLoading(false);
         }
      }
   }

   useEffect(() => {
      fetchArticles();
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
            <div className='container my-5'>
                  <div className='row'>
                     <div className='col-md-3 mb-3'>
                        {/* Sidebar */}
                        <Sidebar/>
                     </div>
                     <div className='col-md-9'>
                        {/* Dashboard */}
                        <div className='card shadow border-0'>
                              <div className='card-body p-4'>
                                 <div className='d-flex justify-content-between'>
                                    <h4 className='h5'>Article</h4>
                                    <Link to="/admin/articles/create" className='btn btn-primary'>Create</Link>
                                 </div>
                                 <hr />
                                 <table className='table table-striped'>
                                    <thead>
                                       <tr>
                                          <th>ID</th>
                                          <th>Title</th>
                                          {/* <th>Slug</th> */}
                                          <th>Status</th>
                                          <th>Action</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {/* {loading && (
                                          <tr>
                                          <td colSpan="4" className="text-center py-4">
                                             <div className="spinner-border text-primary" role="status"></div>
                                          </td>
                                          </tr>
                                       )} */}

                                       {!loading && articles.length === 0 && (
                                          <tr>
                                          <td colSpan="4" className="text-center py-4">
                                             No articles found
                                          </td>
                                          </tr>
                                       )}

                                       { !loading &&
                                          articles && articles.map((article, index) => {
                                             return (
                                                <tr key={`article-${article.id}`}>
                                                   <td>{index + 1}</td>
                                                   <td>{article.title}</td>
                                                   {/* <td>{article.slug}</td> */}
                                                   <td>
                                                      {
                                                         (article.status == 1)? 'Active':'Block'
                                                      }
                                                   </td>
                                                   <td>
                                                      <Link to={`/admin/articles/edit/${article.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                                                      <Link onClick={() => deleteArticle(article.id)} className='btn btn-secondary btn-sm ms-2'>Delete</Link>
                                                   </td>
                                                </tr>
                                             )
                                          })
                                       }
                                    </tbody>
                                 </table>
                              </div>
                        </div>
                     </div>
                  </div>
            </div>
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

export default Show