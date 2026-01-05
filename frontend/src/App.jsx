import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/frontend/Home';
import { About } from './components/frontend/About';
import Services from './components/frontend/Services';
import './assets/css/style.scss';
import Projects from './components/frontend/Projects';
import Blogs from './components/frontend/Blogs';
import ContactUs from './components/frontend/ContactUs';
import Login from './components/backend/Login';
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/backend/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/common/RequireAuth';
import {default as ShowServices} from './components/backend/services/Show';
import {default as CreateServices} from './components/backend/services/Create';
import {default as EditServices} from './components/backend/services/Edit';
import {default as ShowProjects} from './components/backend/projects/Show';
import {default as CreateProject} from './components/backend/projects/Create';
import {default as EditProject} from './components/backend/projects/Edit';
import {default as ShowArticles} from './components/backend/articles/Show';
import {default as CreateArticle} from './components/backend/articles/Create';
import {default as EditArticle} from './components/backend/articles/Edit';
import {default as ShowTestimonials} from './components/backend/testimonials/Show';
import {default as CreateTestimonial} from './components/backend/testimonials/Create';
import {default as EditTestimonial} from './components/backend/testimonials/Edit';
import {default as ShowMembers} from './components/backend/members/Show';
import {default as CreateMember} from './components/backend/members/Create';
import {default as EditMember} from './components/backend/members/Edit';
import ServiceDetail from './components/frontend/ServiceDetail';
import ProjectDetail from './components/frontend/ProjectDetail';
import BlogDetail from './components/frontend/BlogDetail';
import JoditEdit from './components/frontend/JoditEdit';

function App() {

   return (
      <>
         <BrowserRouter>
         <Routes>
               <Route path='/' element={<Home/>} />
               <Route path='/about' element={<About/>} />
               <Route path='/services' element={<Services/>} />
               <Route path='/projects' element={<Projects/>} />
               <Route path='/blogs' element={<Blogs/>} />
               <Route path='/contact' element={<ContactUs/>} />
               <Route path='/admin/login' element={<Login/>} />
               <Route path='/service/:id' element={<ServiceDetail/>} />
               <Route path='/project/:id' element={<ProjectDetail/>} />
               <Route path='/blog/:id' element={<BlogDetail/>} />


               <Route path='/jodit' element={<JoditEdit/>} />


               <Route path='/admin/dashboard' element={
                  <RequireAuth>
                     <Dashboard/>
                  </RequireAuth>
               } />

               {/* Services Routes */}
               <Route path='/admin/services' element={
                  <RequireAuth>
                     <ShowServices/>
                  </RequireAuth>
               } />
               <Route path='/admin/services' element={
                  <RequireAuth>
                     <ShowServices/>
                  </RequireAuth>
               } />
               <Route path='/admin/services/create' element={
                  <RequireAuth>
                     <CreateServices/>
                  </RequireAuth>
               } />
               <Route path='/admin/services/edit/:id' element={
                  <RequireAuth>
                     <EditServices/>
                  </RequireAuth>
               } />

               {/* Projects */}
               <Route path='/admin/projects' element={
                  <RequireAuth>
                     <ShowProjects/>
                  </RequireAuth>
               } />
               <Route path='/admin/projects/create' element={
                  <RequireAuth>
                     <CreateProject/>
                  </RequireAuth>
               } />
               <Route path='/admin/projects/edit/:id' element={
                  <RequireAuth>
                     <EditProject/>
                  </RequireAuth>
               } />

               {/* Articles */}
               <Route path='/admin/articles' element={
                  <RequireAuth>
                     <ShowArticles/>
                  </RequireAuth>
               } />
               <Route path='/admin/articles/create' element={
                  <RequireAuth>
                     <CreateArticle/>
                  </RequireAuth>
               } />
               <Route path='/admin/articles/edit/:id' element={
                  <RequireAuth>
                     <EditArticle/>
                  </RequireAuth>
               } />

               {/* Testimonials */}
               <Route path='/admin/testimonials' element={
                  <RequireAuth>
                     <ShowTestimonials/>
                  </RequireAuth>
               } />
               <Route path='/admin/testimonials/create' element={
                  <RequireAuth>
                     <CreateTestimonial/>
                  </RequireAuth>
               } />
               <Route path='/admin/testimonials/edit/:id' element={
                  <RequireAuth>
                     <EditTestimonial/>
                  </RequireAuth>
               } />

               {/* Members */}
               <Route path='/admin/members' element={
                  <RequireAuth>
                     <ShowMembers/>
                  </RequireAuth>
               } />
               <Route path='/admin/members/create' element={
                  <RequireAuth>
                     <CreateMember/>
                  </RequireAuth>
               } />
               <Route path='/admin/members/edit/:id' element={
                  <RequireAuth>
                     <EditMember/>
                  </RequireAuth>
               } />
         </Routes>
         </BrowserRouter>
         <ToastContainer 
         position='top-center'
         />
      </>
   )
}

export default App
