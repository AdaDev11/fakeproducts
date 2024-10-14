import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function Header() {


    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container-fluid">

                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                        Logo
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Link 1</a></li>
                        <li><a className="dropdown-item" href="#">Link 2</a></li>
                        <li><a className="dropdown-item" href="#">Link 3</a></li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Header;