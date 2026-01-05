import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Sidebar from '../../common/Sidebar'
import { apiUrl, token } from '../../common/http'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Show = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);

   const fetchProjects = async () => {
      setLoading(true);
      try {
         const res = await fetch(apiUrl + "projects", {
            method: "GET",
            headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token()}`
            }
         });
         const result = await res.json();
         setProjects(result.data || []);
      } catch (error) {
         toast.error("Failed to load projects");
      } finally {
         setLoading(false);
      }
   };

   const deleteProject = async (id) => {
   if (confirm("Are you sure you want to delete?")) {
      setLoading(true);
      try {
         const res = await fetch(apiUrl + "projects/" + id, {
         method: "DELETE",
         headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token()}`
         }
         });
         const result = await res.json();
         if (result.status === true) {
         toast.success(result.message);
         setProjects(prev => prev.filter(project => project.id !== id));
         }
      } catch (error) {
         toast.error("Delete failed");
      } finally {
         setLoading(false);
      }
   }
   };
	// const fetchProjects = async () =>{
	// 	const res = await fetch(apiUrl+'projects', {
	// 			'method' : 'GET',
	// 			'headers' : {
	// 				'Content-type' : 'application/json',
	// 				'Accept' : 'application/json',
	// 				'Authorization' : `Bearer ${token()}`
	// 			}
	// 	});
	// 	const result = await res.json();
	// 	setProjects(result.data);
	// }

	// const deleteProject = async (id) => {
   //    if (confirm("Are you sure you want to delete?")){
   //       const res = await fetch(apiUrl+'projects/'+id, {
	// 			'method' : 'DELETE',
	// 			'headers' : {
	// 				'Content-type' : 'application/json',
	// 				'Accept' : 'application/json',
	// 				'Authorization' : `Bearer ${token()}`
	// 			}
   //       });
   //       const result = await res.json();
   //       if (result.status == true){
   //          toast.success(result.message);
   //          const newProjects = projects.filter(project => project.id != id);
   //          setProjects(newProjects);
   //       }
   //    }
	// }

	useEffect(() => {
		fetchProjects();
	}, []);

	return (
      <>
         <Header/>
         <main>
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
                                    <h4 className='h5'>Projects</h4>
                                    <Link to="/admin/projects/create" className='btn btn-primary'>Create</Link>
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
                                       {loading && (
                                          <tr>
                                          <td colSpan="4" className="text-center py-4">
                                             <div className="spinner-border text-primary" role="status"></div>
                                          </td>
                                          </tr>
                                       )}

                                       {!loading && projects.length === 0 && (
                                          <tr>
                                          <td colSpan="4" className="text-center py-4">
                                             No projects found
                                          </td>
                                          </tr>
                                       )}

                                       { !loading &&
                                          projects && projects.map((project, index) => {
                                             return (
                                                <tr key={`project-${project.id}`}>
                                                   <td>{index + 1}</td>
                                                   <td>{project.title}</td>
                                                   {/* <td>{project.slug}</td> */}
                                                   <td>
                                                      {
                                                         (project.status == 1)? 'Active':'Block'
                                                      }
                                                   </td>
                                                   <td>
                                                      <Link to={`/admin/projects/edit/${project.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                                                      <Link onClick={() => deleteProject(project.id)} className='btn btn-secondary btn-sm ms-2'>Delete</Link>
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
         <Footer/>
      </>
   )
}

export default Show