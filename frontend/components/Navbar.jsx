import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="header fixed-top">
            <div className="branding d-flex align-items-center">
                <div className="container d-flex justify-content-between">

                    <h3>Chalukya Sports</h3>

                    <nav className="navmenu">
                        <ul className="d-flex gap-3 list-unstyled m-0">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/news">News</Link></li>
                            <li><Link to="/events">Events</Link></li>
                            <li><Link to="/sports">Sports</Link></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </nav>

                </div>
            </div>
        </header>
    );
}

export default Navbar;