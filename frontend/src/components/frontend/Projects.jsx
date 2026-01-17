import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'
import { apiUrl, fileUrl } from '../common/http'
import { Link } from 'react-router-dom';
import DefaultImage from '../../assets/images/default-project.jpeg';
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


const Projects = () => {
   const [projects, setProjects] = useState([]);
   const [loading, setLoading] = useState(true);
   
   const fetchProjects = async () => {
      const res = await fetch(apiUrl+'get-projects', {
         method : 'GET'
      })

      const result = await res.json();
      // console.log(result);
      if (result.status == true){
         setProjects(result.data);
      }
   }

   useEffect( () => {
      fetchProjects()
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
         <Hero preHeading='Work. Expertise. Results.'
         heading='Our Projects'
         text='Explore our successfully delivered projects in computer & laptop repair,
            printer servicing, CCTV installation, networking, and complete IT support
            for homes and businesses.'
         />
         {/* Our Project Section */}
         <section className='section-3 bg-light py-5'>
               <div className='container py-5'>
                  <div className='section-header text-center'>
                     <span>Our Work</span>
                     <h2>Devika Computer Projects</h2>
                     <p>
                        Professional projects including computer & laptop repairs,
                        printer servicing, CCTV setup, networking solutions,
                        and reliable IT services delivered with quality workmanship.
                     </p>
                  </div>
                  <div className='row pt-4'>
                     {
                        projects && projects.map(project => {
                           return (
                              <div key={`project-${project.id}`} className='col-md-4 col-lg-4'>
                                    <div className='item'>
                                       <div className='service-image'>
                                          {/* <img src={`${fileUrl}uploads/projects/small/${project.image}`} alt="" className='w-100' /> */}
                                          <img
                                             src={
                                                project?.image
                                                ? `${fileUrl}uploads/projects/small/${project.image}`
                                                : DefaultImage
                                             }
                                             alt=""
                                             className='w-100'
                                          />
                                       </div>
                                       <div className='service-body'>
                                          <div className='service-title'>
                                             <h3>{project.title}</h3>
                                          </div>
                                          <div className='service-content'>
                                                <p>
                                                   {project.short_desc}
                                                </p>
                                                <Link to={`/project/${project.id}`} className='btn btn-primary small'>Read More</Link>
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

export default Projects