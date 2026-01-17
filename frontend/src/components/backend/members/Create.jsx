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
		const newData = {...data, "content": content, "imageId":imageId}
		const res = await fetch(apiUrl+'members', {
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
			navigate('/admin/members');
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
								{/* Dashboard */}
								<div className='card shadow border-0'>
										<div className='card-body p-4'>
											<div className='d-flex justify-content-between'>
												<h4 className='h5'>Members / Create</h4>
												<Link to="/admin/members" className='btn btn-primary'>Back</Link>
											</div>
											<hr />
											<form onSubmit={handleSubmit(onSubmit)}>
												<div className='mb-3'>
													<label htmlFor="" className='form-label'>Name</label>
													<input placeholder='Name'
													{
														...register('name', {
															required : "The name field is required."
														})
													}
													type="text" 
													className={`form-control ${errors.name && 'is-invalid'}`} />
													{
														errors. name && <p className='invalid-feedback'>{errors.name?.message}</p>
													}
												</div>
												<div className='mb-3'>
													<label htmlFor="" className='form-label'>Job Title</label>
													<input placeholder='Job Title'
													{
														...register('job_title', {
															required : "The job title field is required."
														})
													}
													type="text" 
													className={`form-control ${errors.job_title && 'is-invalid'}`} />
													{
														errors. job_title && <p className='invalid-feedback'>{errors.job_title?.message}</p>
													}
												</div>
												<div className='mb-3'>
													<label htmlFor="" className='form-label'>Instagram URL</label>
													<input placeholder='Instagram URL'
													{
														...register('instagram_url')
													}
													type="text" 
													className='form-control' />
												</div>
												<div className='mb-3'>
													<label htmlFor="" className='form-label'>Facebook URL</label>
													<input placeholder='Facebook URL'
													{
														...register('facebook_url')
													}
													type="text" 
													className='form-control' />
												</div>
												<div className='mb-3'>
													<label htmlFor="" className='form-label'>LinkedIn URL</label>
													<input placeholder='LinkedIn URL'
													{
														...register('linkedin_url')
													}
													type="text" 
													className='form-control' />
												</div>
												<div className='mb-3'>
													<label htmlFor="" className='form-label'>Image</label>
													<br />
													<input onChange={handleFile} type="file" accept="image/*" className='form-control' />
												</div>
												<div className='mb-3'>
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