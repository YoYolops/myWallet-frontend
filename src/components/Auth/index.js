import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {
    const [ toggleControl, setToggleControl ] = useState(false);

    function toggleHandler() {
        setToggleControl(prevState => !prevState)
    }

    return (
        <AnimatePresence>{
            toggleControl
                ? <Login btText="First time? Sign up" toggle={toggleHandler} />
                : <Signup btText="Already have an account? Log in" toggle={toggleHandler} />
        }</AnimatePresence>
    )
}