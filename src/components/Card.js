import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../context";

function Card({ id, onFavorite, title, imageUrl, price, onPlus, favorited = false, loading = false }) {
    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] =React.useState(favorited);
    const obj = {id, parentId: id, title, imageUrl, price}
    
    const onClickPlus = () => {
        onPlus(obj);
    }

    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite);
    }

    return (
        <div className="card">
            {
                loading ? (<ContentLoader
                    speed={2}
                    width={165}
                    height={245}
                    viewBox="0 0 150 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="0" y="0" rx="10" ry="10" width="175" height="130" />
                    <rect x="0" y="165" rx="10" ry="10" width="165" height="15" />
                    <rect x="0" y="185" rx="0" ry="0" width="100" height="15" />
                    <rect x="0" y="225" rx="10" ry="10" width="80" height="25" />
                    <rect x="118" y="225" rx="10" ry="10" width="30" height="30" />
                </ContentLoader>
                ) : (
                    <>
                        <div className="favorite" onClick={onClickFavorite}>
                            <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="unliked" />
                        </div>
                        <img width={175} height={130} src={imageUrl} alt="#" />
                        <h5>{title}</h5>
                        <div className="cardBottom">
                            <div className="cardBottomInside">
                                <span>Price:</span>
                                <b>{price}</b>
                            </div>
                            <button className="button">
                                <img onClick={onClickPlus} src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="#" />
                            </button>
                        </div>
                    </>)
            }

        </div>
    );
}

export default Card;


