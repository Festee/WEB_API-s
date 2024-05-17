import React from "react";
import { withAdminAuth } from "../HOC";

function AuthenticationTestAdmin(){
    return(
        <div>This page can be accessed if role is admin</div>
    )
}

export default withAdminAuth (AuthenticationTestAdmin);