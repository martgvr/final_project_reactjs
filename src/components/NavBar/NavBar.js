import CartWidget from "../CartWidget/CartWidget";
import "./navbar.css"
import { Link } from 'react-router-dom'

function NavBar() {
    return(
        <nav className="navbar">
            <picture>
                <Link to="/"><img src="./logo.png" alt="Logo de la página" /></Link>
            </picture>
            <ul className="menu">
                <li className="menu__item">Home</li>
                <Link to="/"><li className="menu__item active">Productos</li></Link>
                <li className="menu__item">Contacto</li>
                <CartWidget />
            </ul>
        </nav>
    )
}

export default NavBar;