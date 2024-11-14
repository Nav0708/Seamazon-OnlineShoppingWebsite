import React from "react"
import header from './layouts/header';
import footer from "./layouts/footer";

const layout = (props) =>{
    return(
        <div>
            <header/>
            <main>
                {props.children}
            </main>
            <footer/>
        </div>
    )
} 
export default layout;