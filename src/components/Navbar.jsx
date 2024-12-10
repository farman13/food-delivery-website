import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { useState } from 'react';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

function Navbar() {
    const [viewCart, setviewCart] = useState(false);
    let data = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("Token");
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-success">
                <div className="container-fluid">
                    <span className="navbar-brand text-white fs-2" to="/">Foodie</span>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-4 text-white" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("Token")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-4 text-white" aria-current="page" to="/myOrder">My orders</Link>
                                </li>
                                : ""
                            }
                        </ul>
                        {(!localStorage.getItem("Token")) ?
                            <div className='d-flex'>
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </div>
                            :
                            <div>
                                <div className='btn bg-white text-success mx-2' onClick={() => setviewCart(true)}> My cart {"  "}
                                    <Badge pill bg='danger'>{data.length}</Badge> </div>
                                {viewCart ? <Modal onClose={() => setviewCart(false)}><Cart /></Modal> : null}
                                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}> Logout</div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
