import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import avatar from './avatar.png'
const token = localStorage.getItem("token")
export class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuth: ''
        };
    }

    submitHandler() {
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

                                {(token && token !== "" && token !== undefined) ?
                                    <div className="navbar-nav" >
                                        <img src={avatar} height={40} width={40} alt="Logo" />
                                        <div className="col-auto " style={{ color: "#013c41", marginLeft: 10,marginTop: 10 }} className="nav-item">{JSON.parse(localStorage.getItem('user')).nom + ' ' + JSON.parse(localStorage.getItem('user')).prenom}</div>
                                    </div>
                                    : <div></div>}




                                <ul className="navbar-nav">

                                    <li className="nav-item">
                                        {(token && token !== "" && token !== undefined) ? <a className="nav-link" onClick={() => { this.submitHandler() }} href="#" title="Déconnecter">Déconnecter</a> : <div></div>}
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