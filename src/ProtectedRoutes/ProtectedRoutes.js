
import { useState } from "react";
import { Redirect,Route } from "react-router-dom";


function ProtectedRoutes({isAuth:isAuth ,component:Component,...rest}){
    return(
        <Route
            {...rest} 
            render = {(props) => {
                if (isAuth){
                    return <Component />
                }else {
                    return (
                        <Redirect
                            to = {{pathname : "/SigIn",State:{from:props.location}}}
                        />
                    )
                }
            }}
        />

    )

}
export default ProtectedRoutes