import { useState } from "react";
import { AnimateSharedLayout } from "framer-motion";

import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {
    const [ toggleControl, setToggleControl ] = useState(false);

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