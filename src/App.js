import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCardOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading ] = React.useState(true);

  React.useEffect(() => {
    async function fetchData () {
      const cartResponse = await axios.get('https://62a60be4430ba53411d0617f.mockapi.io/Cart');
      const favoriteResponse = await axios.get('https://62a60be4430ba53411d0617f.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://62a60be4430ba53411d0617f.mockapi.io/items');

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
    if (findItem) {
      setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id) ));
      axios.delete(`https://62a60be4430ba53411d0617f.mockapi.io/Cart/${findItem.id}`)
    } else {
      setCartItems((prev) => [...prev, obj]);
      const {data} = await axios.post('https://62a60be4430ba53411d0617f.mockapi.io/Cart', obj);
      setCartItems((prev) => prev.map(item => {
        if (item.parentId === data.parentId) {
          return {
            ...item,
            id: data.id
          };
        }
        return item;
      }));
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://62a60be4430ba53411d0617f.mockapi.io/Cart/${id}`);
    setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
  }

  const onAddToFavorite = async (obj) => {
    try{
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://62a60be4430ba53411d0617f.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));

      } else {
        const { data } = await axios.post('https://62a60be4430ba53411d0617f.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Try again");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{ setCartItems, cartItems, favorites, items, isItemAdded, onAddToFavorite, setCardOpened, onAddToCart }}>
      <div className='wrapper'>
        {cartOpened ? <Drawer items={cartItems} onClose={() => setCardOpened(false)} onRemove={onRemoveItem} /> : null}
        <Header onClickCart={() => setCardOpened(true)} />
        <Routes>

          <Route path='/' exact element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />}>
          </Route>

          <Route path='/favorites' exact element={
            <Favorites
            />}>
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;