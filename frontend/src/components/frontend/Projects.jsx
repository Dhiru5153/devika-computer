import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'
import { apiUrl, fileUrl } from '../common/http'
import { Link } from 'react-router-dom';
import DefaultImage from '../../assets/images/default-project.jpeg';

const Projects = () => {
   const [projects, setProjects] = useState([]);
   
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
   }, []);
   
   return (
   <>
      <Header/>
      <main>
         <Hero preHeading='Work. Impact. Results.'
         heading='Our Projects'
         text='Discover our completed projects in computer repairing, CCTV setup,
               networking, and IT services executed with quality and reliability.'
         />
         {/* Our Project Section */}
         <section className='section-3 bg-light py-5'>
               <div className='container py-5'>
                  <div className='section-header text-center'>
                     <span>Our Projects</span>
                     <h2>Our Devika Computer Projects</h2>
                     <p>Computer, Laptop, Printer, CCTV, Networking, Repairing And Services</p>
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
      <Footer/>
   </>
   )
}

export default Projects