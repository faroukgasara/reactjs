import React, { Component } from "react";
import { Redirect } from "react-router-dom";


export class Header extends Component {

    async submitHandler() {
        localStorage.clear();
        window.location.reload();
    }
    render() {
        return (
            <header>
                <div className="container">
                    <div className="nav-wrapper">
                        <nav className="navbar navbar-expand-lg">
                            <a className="navbar-brand logo logo-header anim-logo" href="https://piximind.com">
                                <img src="https://piximind.com/themes/pkurg-spacebootstrap5/assets/img/svg/logo.svg" alt="Piximind" className="logo-white" />
                                <img src="https://piximind.com/themes/pkurg-spacebootstrap5/assets/img/svg/logo.svg" alt="Piximind" className="logo-green" />
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <div className="menu-btn"><span></span></div>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => { this.submitHandler() }} href="#" title="Déconnecter">Déconnecter</a>
                                    </li>
                                </ul>
                                <div className="menu-btn d-none d-sm-block">
                                    <span></span>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;