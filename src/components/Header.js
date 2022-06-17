import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <Link to="/">
        <div className="headerLeft">
          <img width={40} height={40} src="/img/logo.png" alt='logo'/>
          <div className="headerInfo">
            <h3 className="uppercase">React Arcitechture</h3>
            <p>The best project</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight">
        <li onClick={props.onClickCart} >
          <img className="firstIcon" width={18} height={18} src="/img/cart.svg" alt="cart" />
          <span>Cart</span>
        </li>
        <li>
          <Link to="/favorites">
            <img className="secondIcon" width={18} height={18} src="/img/heart.svg" alt="favorite" />
          </Link>
        </li>
        <li>
          <img className="secondIcon" width={18} height={18} src="/img/user.svg" alt="user" />
        </li>
      </ul>
    </header>
  );
}

export default Header;