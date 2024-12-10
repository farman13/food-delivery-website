import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import axios from 'axios';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        try {
            const response = await axios.get("http://localhost:5000/order/myOrderData", {
                params: { email: localStorage.getItem('userEmail') }, // Pass email in query
                headers: { 'Content-Type': 'application/json' },
            });

            console.log(response.data);
            setOrderData(response.data.orderData); // Set the order data from response
        } catch (error) {
            console.error("Error fetching orders:", error.message);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="container">
                <div className="row">
                    {orderData && orderData.order_data ? (
                        orderData.order_data
                            .slice(0). // Reverse the array by slicing and reversing
                            reverse().map((item, index) => (
                                <div key={index}>
                                    {item.map((arrayData, idx) => (
                                        <div key={idx}>
                                            {arrayData.Order_date ? (
                                                <div className="m-auto mt-5">
                                                    <h5>Order Date: {arrayData.Order_date}</h5>
                                                    <hr />
                                                </div>
                                            ) : (
                                                <div className="col-12 col-md-6 col-lg-3">
                                                    <div
                                                        className="card mt-3"
                                                        style={{
                                                            width: "16rem",
                                                            maxHeight: "360px",
                                                        }}
                                                    >
                                                        <img
                                                            src={arrayData.img}
                                                            className="card-img-top"
                                                            alt="..."
                                                            style={{
                                                                height: "120px",
                                                                objectFit: "fill",
                                                            }}
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                            <div
                                                                className="container w-100 p-0"
                                                                style={{ height: "38px" }}
                                                            >
                                                                <span className="m-1">{arrayData.qty}</span>
                                                                <span className="m-1">{arrayData.size}</span>
                                                                <span className="m-1">{arrayData.Order_date}</span>
                                                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                                    ₹{arrayData.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))
                    ) : (
                        <p>No Orders Found</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
