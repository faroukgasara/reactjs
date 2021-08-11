import React, { Component } from "react";

export class Footer extends Component {
    render() {
        return (
            <footer className="footer pt-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 content-center">
                            <p>Copyright PixiMind 2021</p>
                        </div>
                        <div className="col-md-6 text-right">
                            <div className="wrap-footer-social">
                                <a href="https://www.facebook.com/piximind/?ref=pages_you_manage" title="Pixi Facebook" target="_blank"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://www.linkedin.com/company/piximind/mycompany/?viewAsMember=true" title="Pixi Linked-in" target="_blank"><i className="fab fa-linkedin-in"></i></a>
                                <a href="https://www.instagram.com/piximind_officiel/" title="Pixi Instagram" target="_blank"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        );
    }
}
export default Footer;