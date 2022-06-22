import {useEffect} from "react";
import jwt from "jsonwebtoken";
import {Button} from "@mui/material";

const GoogleLogin = () => {

    const handleCredentialResponse = async (response) => {
        try {
            const data = await jwt.decode(response.credential);
            console.log(data);
        } catch (e) {
            console.log({e})
        }
    }
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "915033900039-bdlfua16lgflief48fks1e5u4e6b44u4.apps.googleusercontent.com",
            cancel_on_tap_outside: false,
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("googleButton"),
            {theme: "filled_blue", size: "large", shape: 'pill'}
        );
    }, [])


    return (<Button id={'googleButton'} sx={{textTransform: 'none'}} variant={'text'} fullWidth={true}>Login</Button>)
}

export default GoogleLogin;