import { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    let priceRef = useRef();

    let options = props.options;
    let optionsData = Object.keys(options);

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    const handleAddToCart = async () => {

        let food = [];

        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
            }
        }

        if (food != []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return;
            }

            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                console.log(data);
                return;
            }
            return;
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        console.log(data);
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value);
    }, [])

    return (
        <>
            <div className="card" style={{ "width": "20rem" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="container w-100">
                        <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>

                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {optionsData.map((data) => {
                                return (
                                    <option key={data} value={data}>{data}</option>
                                )
                            })}
                        </select>
                        <div className="d-inline h-100 fs-5"> Rs{finalPrice}/-</div>
                    </div>
                    <hr />
                    <button className={"btn btn-success justify-center ms-2"} onClick={handleAddToCart}> Add to Cart</button>
                </div>
            </div>
        </>
    )
}

export default Card;
