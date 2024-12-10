import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar";

function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" })
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://food-delivery-website-black.vercel.app/user/signup",
                {
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.location,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(response.data);

            if (response.data.message === "User Signup") {
                alert("Signup successful!");
                navigate('/');
            } else {
                alert(response.data.error || "Invalid credentials");
            }
        } catch (error) {
            console.error("Error during signup:", error.response?.data || error.message);
            alert("Signup failed. Please try again.");
        }
    }

    function onChangefunc(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div><Navbar /></div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChangefunc} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChangefunc} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="text" className="form-control" name="password" value={credentials.password} onChange={onChangefunc} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Location</label>
                        <input type="text" className="form-control" name="location" value={credentials.location} onChange={onChangefunc} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger" >Already a user</Link>
                </form>
            </div>
        </>
    )
}
export default Signup;
