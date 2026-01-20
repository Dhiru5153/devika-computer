import React, { useState, useRef, useMemo, useEffect } from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import Footer from '../../common/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { apiUrl, token } from '../../common/http'
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

const Create = ({placeholder}) => {

   const editor = useRef(null);
   const [content, setContent] = useState('');
   const [isDisable, setIsDisable] = useState(false);
   const [imageId, setImageId] = useState(null);
   const [videoId, setVideoId] = useState(null);
   const [loading, setLoading] = useState(true);


   const config = useMemo(() => ({
         readonly: false,
         placeholder: placeholder || 'Content'
      }),
      [placeholder]
   );

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const navigate = useNavigate();

   const onSubmit = async (data) => {
      const newData = {...data, "content": content, "imageId":imageId, "videoId": videoId}
      const res = await fetch(apiUrl+'projects', {
         'method' : 'POST',
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
         navigate('/admin/projects');
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
                        <div className='card shadow border-0'>
                              <div className='card-body p-4'>
                                 <div className='d-flex justify-content-between'>
                                    <h4 className='h5'>Projects / Create</h4>
                                    <Link to="/admin/projects" className='btn btn-primary'>Back</Link>
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

                                    <div className='row mb-3'>
                                       <div className='col-md-6'>
                                          <label htmlFor="" className='form-label'>Location</label>
                                          <input placeholder='Location'
                                          {
                                             ...register('location')
                                          }
                                          type="text" 
                                          className={`form-control`} />
                                       </div>
                                       <div className='col-md-6'>
                                          <label htmlFor="" className='form-label'>Project Type</label>
                                          <select className='form-control'
                                             {
                                                ...register('construction_type')
                                             }
                                          >
                                             <option value="">Project Type</option>
                                             <option value="Hardware Repair & Maintenance">Hardware Repair & Maintenance</option>
                                             <option value="Software Installation & Configuration">Software Installation & Configuration</option>
                                             <option value="System Formatting & Upgrade">System Formatting & Upgrade</option>
                                             <option value="CCTV & Security">CCTV & Security</option>
                                          </select>
                                       </div>
                                    </div>

                                    <div className='row mb-3'>
                                       <div className='col-md-6'>
                                          <label htmlFor="" className='form-label'>Sector</label>
                                          <select className='form-control'
                                             {
                                                ...register('sector')
                                             }
                                          >
                                             <option value="">Sector</option>
                                             <option value="Health">Health</option>
                                             <option value="Education">Education</option>
                                             <option value="Corporate">Corporate</option>
                                             <option value="Residential / Home">Residential / Home</option>
                                             <option value="Business / Commercial">Business / Commercial</option>
                                          </select>
                                       </div>
                                       <div className='col-md-6'>
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
                                    </div>

                                    <div className='mb-3'>
                                       <label htmlFor="" className='form-label'>Short Description</label>
                                       <textarea placeholder='Short Description'
                                       {
                                          ...register('short_desc')
                                       }
                                       className='form-control' rows={4}></textarea>
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
                                       <label htmlFor="" className='form-label'>Image</label>
                                       <br />
                                       <input onChange={handleFile} accept="image/*" type="file" className='form-control' />
                                    </div>
                                    
                                    <button disabled={isDisable} className='btn btn-primary'>Submit</button>
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

export default Create