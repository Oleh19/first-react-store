import React from "react";
import AppContext from "../context";
import Info from "./Info";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    
    const onClickOrder = async () => {
        
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://62a60be4430ba53411d0617f.mockapi.io/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://62a60be4430ba53411d0617f.mockapi.io/Cart/${item.id}`);
                await delay(1000);
            }
        } catch  {
            alert("The order isn't made, try again");
        }
        setIsLoading(false);
    };

    return (
        <div className="overlay">
            <div className="drawer">
                <h2>Cart
                    <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="#" />
                </h2>

                {items.length > 0 ? (
                    <><div className="items">
                        {items.map((obj) => (
                            <div key={obj.id} className="cartItem">
                                <img className="cartImg" width={100} height={90} src={obj.imageUrl} alt="#" />
                                <div className="cartBody">
                                    <p className="cartDescription">{obj.title}</p>
                                    <b>{obj.price}</b>
                                </div>
                                <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="#" />
                            </div>
                        ))}
                    </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Summary:</span>
                                    <div>1000 000$</div>
                                    <b></b>
                                </li>
                                <li>
                                    <span>Tax 10%:</span>
                                    <div>10 000$</div>
                                    <b></b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Order</button>
                        </div>
                    </>
                ) : (
                    <Info
                        title={isOrderComplete ? "Order" : "Empty cart" } 
                        description={isOrderComplete ? `Your order #${orderId} will be soon` : "Add items"}
                        image={isOrderComplete ? "/img/complete-order.jpeg" : "/img/empty-cart.jpeg"}
                    />
                )}
            </div>
        </div>
    );
}

export default Drawer;






