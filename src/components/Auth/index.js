import { useState, useLayoutEffect, useContext } from "react";
import { useHistory } from "react-router";
import { AnimateSharedLayout } from "framer-motion";

import AppContext from "../context/AppContext";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {
    const history = useHistory();
    const { userData } = useContext(AppContext);
    const [ toggleControl, setToggleControl ] = useState(false);

    useLayoutEffect(() => {
        console.log(userData)
        if(userData) history.push("/main")
    }, [history, userData])

    function toggleHandler() {
        setToggleControl(prevState => !prevState)
    }

    return (
        <AnimateSharedLayout>{
            toggleControl
                ? <Login btText="First time? Sign up" toggle={toggleHandler} />
                : <Signup btText="Already have an account? Log in" toggle={toggleHandler} />
        }</AnimateSharedLayout>
    )
}