import React, { useContext, useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './context/Auth'
import { apiUrl } from '../common/http'
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

const Login = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);


    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        // console.log(data)
        const res = await fetch(apiUrl+'authenticate', {
            method : "POST",
            headers: {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(data)
        });
        const result = await res.json();
        if (result.status == false){
            toast.error(result.message)
        } else {
            const userInfo = {
                id : result.id,
                token : result.token,
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            login(userInfo);
            navigate('/admin/dashboard');
        }
        // console.log(result);
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
                <div className='login-form my-5 d-flex justify-content-center'>
                    <div className='card shadow border-0'>
                        <div className='card-body p-4'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h4 className='mb-3'>Login Here</h4>
                                <div className='mb-3'>
                                    <label htmlFor="" className='form-label'>Email</label>
                                    <input 
                                        {
                                            ...register('email', {
                                                required: "This field is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })
                                        }
                                    type="text" placeholder='Email' 
                                    className={`form-control ${errors.email && 'is-invalid'}`} />
                                    {
                                        errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                    }
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="" className='form-label'>Password</label>
                                    <input 
                                        {
                                            ...register('password', {
                                                required: "This field is required"
                                            })
                                        }
                                    type="password" placeholder='Password'  
                                    className={`form-control ${errors.password && 'is-invalid'}`} />
                                    {
                                        errors. password && <p className='invalid-feedback'>{errors.password?.message}</p>
                                    }
                                </div>
                                <button type='submit' className='btn btn-primary'>Login</button>
                            </form>
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

export default Login