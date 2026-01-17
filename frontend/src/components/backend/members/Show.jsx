import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Sidebar from '../../common/Sidebar'
import { apiUrl, token } from '../../common/http'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
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

const Show = () => {
	const [members, setMembers] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchMembers = async () =>{
		setLoading(true);
		try {
			const res = await fetch(apiUrl+'members', {
				'method' : 'GET',
				'headers' : {
					'Content-type' : 'application/json',
					'Accept' : 'application/json',
					'Authorization' : `Bearer ${token()}`
				}
			});
			const result = await res.json();
			setMembers(result.data);
		} catch (error) {
			toast.error("Failed to load members");
		} finally {
			setLoading(false);
		}
	}

	const deleteMember = async (id) => {
		if (confirm("Are you sure you want to delete?")){
			setLoading(true);
			try {
				const res = await fetch(apiUrl+'members/'+id, {
					'method' : 'DELETE',
					'headers' : {
						'Content-type' : 'application/json',
						'Accept' : 'application/json',
						'Authorization' : `Bearer ${token()}`
					}
				});
				const result = await res.json();

				if (result.status == true) {
					const newMembers = members.filter(member => member.id != id)
					setMembers(newMembers)
					toast.success(result.message)
				} else {
					toast.error(result.message)
				}
			} catch (error) {
				toast.error("Delete failed");
			} finally {
				setLoading(false);
			}
		}
	}

	useEffect(() => {
		fetchMembers();
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
												<h4 className='h5'>Member</h4>
												<Link to="/admin/members/create" className='btn btn-primary'>Create</Link>
											</div>
											<hr />
											<table className='table table-striped'>
												<thead>
													<tr>
														<th>ID</th>
														<th>Name</th>
														<th>Job Title</th>
														{/* <th>Instagram</th>
														<th>LinkedIn</th> */}
														<th>Status</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody>
													{/* {loading && (
														<tr>
														<td colSpan="5" className="text-center py-4">
															<div className="spinner-border text-primary" role="status"></div>
														</td>
														</tr>
													)} */}

													{!loading && members.length === 0 && (
														<tr>
														<td colSpan="5" className="text-center py-4">
															No members found
														</td>
														</tr>
													)}

													{ !loading &&
														members && members.map((member, index) => {
															return (
																<tr key={`member-${member.id}`}>
																	<td>{index + 1}</td>
																	<td>{member.name}</td>
																	<td>{member.job_title}</td>
																	{/* <td>{member.instagram_url}</td>
																	<td>{member.linkedin_url}</td> */}
																	<td>
																		{
																			(member.status == 1)? 'Active':'Block'
																		}
																	</td>
																	<td>
																		<Link to={`/admin/members/edit/${member.id}`} className='btn btn-primary btn-sm'>Edit</Link>
																		<Link onClick={() => deleteMember(member.id)} className='btn btn-secondary btn-sm ms-2'>Delete</Link>
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

export default Show