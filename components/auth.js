import {Button, Menu, MenuItem} from "@mui/material";
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import Login from "./login";
import ModalComponent from "./modal";

const Auth = () => {
    const [username, setUsername] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        try {
            const {data} = await axios.post("/api/logout");
            handleMenuClose();
            localStorage.removeItem("user");
            setUsername("");
            toast.success("Successfully logged out");
        } catch (e) {
            console.log({e});
            toast.error(e.response?.data.message ?? "Can't logout");
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUsername(user);
        }
    }, [username]);

    return (
        <>
            {
                username ? (
                    <Button sx={{ml: "auto", textTransform: 'none'}} color={"inherit"} onClick={handleMenu}>
                        Hello {username}!
                    </Button>
                ) : (
                    <Button color={"inherit"} onClick={handleOpen} sx={{ml: "auto"}}>
                        Login
                    </Button>
                )
            }

            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            <ModalComponent open={open} handleClose={handleClose}>
                <Login onCancel={handleClose} setUsername={setUsername}/>
            </ModalComponent>
        </>
    )
}

export default Auth;