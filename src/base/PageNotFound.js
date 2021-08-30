import React from 'react';

import sadface from './sadface.png';
const PageNotFound = () => {
    return (
        <div className="container" style={{ marginLeft: "180px" }}>
            <div className="error">
                <p className="p1" style={{ color: "red" }}>Nous sommes désolés mais il semble que cette page n'existe plus.</p>
                <p className="p1" style={{ color: "red" }}> Tu as déjà passé le test</p>
                <h1 className="h"> <img src={sadface} height={500} width={500} alt="SadFace" /></h1>
            </div>
        </div>
    )
}
export default PageNotFound