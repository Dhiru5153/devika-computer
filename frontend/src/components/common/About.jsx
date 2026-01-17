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
                    <h2>Computer & IT Service</h2>
                    <p>
                        We are a reliable computer and electronics service shop committed to delivering
                        high-quality repair and IT solutions. From computer and laptop repairs to printers,
                        accessories, CCTV installations, and networking support, we ensure fast, affordable,
                        and professional service for both homes and businesses.
                        <br/><br/>
                        Our experienced technicians focus on accurate diagnosis, genuine parts, and
                        customer satisfaction to keep your systems running smoothly and securely.
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About