import React from 'react';
import AboutImg from '../../assets/images/about-us.jpg';


const About = () => {
  return (
    <section className='section-2 py-5'>
        <div className='container py-5'>
            <div className='row'>
                <div className='col-md-6 mb-3'>
                    <img src={AboutImg} className='w-100'/>
                </div>
                <div className='col-md-6 mb-3'>
                    <span>About Us</span>
                    <h2>The most trusted computer and electronics shop</h2>
                    <p>
                        New Computer, Laptop, Printer & Accessories
                        <br/>Repairing with Expert Touch
                        <br/>CCTV Installation - Analog & IP Cameras
                        <br/>Fast & Reliable Computer Support
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About