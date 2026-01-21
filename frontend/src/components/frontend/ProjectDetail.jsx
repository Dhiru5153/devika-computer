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


const ProjectDetail = () => {

   const[project, setProject] = useState([])
   const params = useParams();
   const [loading, setLoading] = useState(false);

   const fetchProject = async () => {
      setLoading(true);
      try {
         const res = await fetch(`${apiUrl}get-project/${params.id}`, {
            'method' : 'GET'
         });
         const result = await res.json();
         console.log(result);
         setProject(result.data);
      } catch (error) {
         toast.error("Failed to load project");
      } finally {
         setLoading(false);
      }
   }
   
   useEffect(() => {
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth"
      });
      fetchProject()
      const timer = setTimeout(() => {
         setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
   }, []);

   const videoId = project?.video ? getYoutubeId(project.video) : null;
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
            heading={`${project.title}`}
            text=''
            />
            <section className='section-10'>

               <div className='container py-5'>
                  <div className='row'>
                     <div className='col-md-3 mb-3'>
                        <div className='card shadow border-0 sidebar'>
                           <div className='card-body px-4 py-4'>
                              <h3 className='mt-2 mb-3'>Insights</h3>
                              <ul>
                                 {
                                    project.location && 
                                    <li className='mb-2'>
                                       <span className='text-body-secondary'>Location</span>
                                       <p>{project.location}</p>
                                    </li>
                                 }
                                 {
                                    project.construction_type && 
                                    <li className='mb-2'>
                                       <span className='text-body-secondary'>Project Type</span>
                                       <p>{project.construction_type}</p>
                                    </li>
                                 }
                                 {
                                    project.sector && 
                                    <li className='mb-2'>
                                       <span className='text-body-secondary'>Sector</span>
                                       <p>{project.sector}</p>
                                    </li>
                                 }
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div className='col-md-9'>
                        <div>
                           {/* {loading && (
                              <div className="text-center py-4">
                                 <div className="spinner-border text-primary" role="status"></div>
                              </div>
                           )} */}

                           {!loading && project.length === 0 && (
                              <div className="text-center py-4">
                                 No project found
                              </div>
                           )}

                           { !loading && project?.video ? (
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
                           ) : project?.image ? (
                              <img
                                 src={`${fileUrl}uploads/projects/large/${project.image}`}
                                 alt={project.title || "Project Image"}
                                 className="w-100"
                              />
                           ) : null}
                        </div>
                        <h3 className='py-3'>{project.title}</h3>
                        {/* <div>
                           {project.short_desc}
                        </div> */}
                        <div dangerouslySetInnerHTML={{ __html: project.content }}></div>
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

export default ProjectDetail