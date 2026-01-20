import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Sidebar from '../common/Sidebar'
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

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
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
                    <div className='col-md-9 dashboard'>
                        {/* Dashboard */}
                        <div className='card shadow border-0'>
                            <div className='card-body d-flex justify-content-center align-items-center'>
                                <h4>Welcome to Admin Dashboard</h4>
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

export default Dashboard