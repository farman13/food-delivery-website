import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Home() {
    const [foodItem, setfoodItem] = useState([]);
    const [foodCategory, setfoodCategory] = useState([]);
    const [search, setSearch] = useState('');

    async function loadData() {
        const response = await axios.get("http://localhost:5000/data/fooddata", {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        setfoodItem(response.data[0]);
        setfoodCategory(response.data[1]);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <div><Navbar /></div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: 'contain' }}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-centre">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7YqdXlSk5upu8y-RL68xtvJ0dBfmpE78OOw&s" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item ">
                        <img src="https://sharethespice.com/wp-content/uploads/2024/02/Paneer-Tikka-Featured.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5bqC7IA8JdjL19Ko8baj61wNE8Qlab3GWw&s" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className='container'>
                {
                    foodCategory != [] ?
                        foodCategory.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        foodItem != [] ?
                                            foodItem.filter((item) => (item.CategoryName == data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                                .map(filterItems => {
                                                    return (
                                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                            <Card foodItem={filterItems} options={filterItems.options[0]} />
                                                        </div>
                                                    )
                                                })
                                            :
                                            <div>No such data found </div>
                                    }
                                </div>
                            )
                        })
                        :
                        ""
                }
            </div>
            <div><Footer /></div>
        </>
    )
}

export default Home;
