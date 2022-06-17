import React from 'react';
import Card from '../components/Card'

function Home({ items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, isLoading }) {
    const renderItems = () => {
        const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );

        return (isLoading ? [...Array(6)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onPlus={(obj) => { onAddToCart(obj) }}
                onFavorite={(obj) => { onAddToFavorite(obj) }}
                loading={isLoading}
                {...item}
            />
        ));
    };
    return (
        <div className="content">
            <div className="content-body">
                <h1 className="title">{searchValue ? `Search: "${searchValue}"` : 'All propouse'}</h1>
                <div className="search-block">
                    <img src="/img/search.svg" alt="search" />
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
                </div>
            </div>
            <div className="product">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;