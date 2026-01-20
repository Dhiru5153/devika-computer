import React, { useState, useRef, useMemo, useEffect } from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import Footer from '../../common/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { apiUrl, token, fileUrl } from '../../common/http'
import { toast } from 'react-toastify'
import JoditEditor from 'jodit-react'
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

const Edit = ({placeholder}) => {
   const editor = useRef(null);
	const [content, setContent] = useState('');
	const [article, setArticles] = useState('');
	const [isDisable, setIsDisable] = useState(false);
	const [imageId, setImageId] = useState(null);
   const params = useParams();   
   const [videoId, setVideoId] = useState(null);
   const [loading, setLoading] = useState(true);

   const config = useMemo(() => ({
			readonly: false,
			placeholder: placeholder || ''
		}),
		[placeholder]
	);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues : async () => {
         const res = await fetch(apiUrl+'articles/'+params.id, {
         'method' : 'GET',
         'headers' : {
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token()}`
         }
      });
      const result = await res.json();
      setContent(result.data.content);
      setArticles(result.data);
      return {
         title: result.data.title,
         slug: result.data.slug,
         author: result.data.author,
         video: result.data.video,
         status: result.data.status,
      }
      }
   });

   const navigate = useNavigate();

   const onSubmit = async (data) => {
      const newData = {...data, "content": content, "imageId":imageId, "videoId": videoId}
      const res = await fetch(apiUrl+'articles/'+params.id, {
         'method' : 'PUT',
         'headers' : {
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token()}`
         },
         body : JSON.stringify(newData)
      });
      const result = await res.json();
      if (result.status == true) {
         toast.success(result.message);
         navigate('/admin/articles');
      } else {
         toast.error(result.message);
      }
   }

   const handleFile = async (e) => {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      setIsDisable(true);
      
      await fetch(apiUrl+'temp-image', {
         'method' : 'POST',
         'headers' : {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token()}`
         },
         body : formData
      })
      .then(response => response.json())
      .then(result => {
         setIsDisable(false);
         if (result.status == false){
            toast.error(result.errors.image[0])
         } else {
            setImageId(result.data.id)
         }
      });
   }
   
   useEffect(() => {
      const timer = setTimeout(() => {
         setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
   }, []);

   const videoUrl = article?.video ? getYoutubeId(article.video) : null;
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
                                    <h4 className='h5'>Articles / Edit</h4>
                                    <Link to="/admin/articles" className='btn btn-primary'>Back</Link>
                                 </div>
                                 <hr />
                                 <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='mb-3'>
                                       <label htmlFor="" className='form-label'>Title</label>
                                       <input placeholder='Title'
                                       {
                                          ...register('title', {
                                             required : "The title field is required."
                                          })
                                       }
                                       type="text" 
                                       className={`form-control ${errors.title && 'is-invalid'}`} />
                                       {
                                          errors. title && <p className='invalid-feedback'>{errors.title?.message}</p>
                                       }
                                    </div>
                                    <div className='mb-3'>
                                       <label htmlFor="" className='form-label'>Slug</label>
                                       <input placeholder='Slug'
                                       {
                                          ...register('slug', {
                                             required : "The slug field is required."
                                          })
                                       }
                                       type="text" 
                                       className={`form-control ${errors.slug && 'is-invalid'}`} />
                                       {
                                          errors. slug && <p className='invalid-feedback'>{errors.slug?.message}</p>
                                       }
                                    </div>
                                    <div className='mb-3'>
                                       <label htmlFor="" className='form-label'>Author</label>
                                       <input placeholder='Author'
                                       {
                                          ...register('author')
                                       }
                                       type="text"
                                       className='form-control' />
                                    </div>
                                    <div className='mb-3'>
                                       <label htmlFor="" className='form-label'>Content</label>
                                       <JoditEditor
                                          ref={editor}
                                          value={content}
                                          config={config}
                                          tabIndex={1}
                                          onBlur={newContent => setContent(newContent)}
                                          onChange={newContent => {}}
                                       />
                                    </div>
                                    
												<div className='mb-3'>
													<label htmlFor="" className='form-label'>YouTube URL</label>
													<input placeholder='YouTube URL'
													{
														...register('video')
													}
													type="text" 
													className='form-control' />
												</div>
                                    <div className='mb-3'>
                                       { !loading && article?.video ? (
                                          <div className="w-100 h-100">
                                             {!play ? (
                                                <div
                                                   className="position-relative cursor-pointer"
                                                   onClick={() => setPlay(true)}
                                                >
                                                   {/* Poster */}
                                                   <img
                                                   src={`https://img.youtube.com/vi/${videoUrl}/maxresdefault.jpg`}
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
                                                   src={`https://www.youtube.com/embed/${videoUrl}?autoplay=0`}
                                                   title="YouTube video"
                                                   allow="autoplay; encrypted-media"
                                                   allowFullScreen
                                                   ></iframe>
                                                </div>
                                             )}
                                             </div>
                                       ) : null}
                                    </div>

                                    <div className='mb-3'>
                                       <label htmlFor="" className='form-label'>Image</label>
                                       <br />
                                       <input onChange={handleFile} type="file"  accept="image/*" className='form-control' />
                                    </div>
                                    <div className='pb-3'>
                                       {
                                          !loading && article.image && <img src={fileUrl+'uploads/articles/small/'+article.image} alt="" style={{ width: '60%'}}/>
                                       }
                                    </div>
                                    <div className='mb-3'>
                                       <label htmlFor="" className='form-label'>Status</label>
                                       <select
                                       {
                                          ...register('status')
                                       }
                                       className='form-control'>
                                          <option value="1">Active</option>
                                          <option value="0">Block</option>
                                       </select>
                                    </div>
                                    <button disabled={isDisable} className='btn btn-primary'>Update</button>
                                 </form>
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

export default Edit