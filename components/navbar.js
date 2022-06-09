import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import {useState} from "react";
import ModalComponent from "./modal";
import Login from "./login";
import Link from 'next/link'


const Navbar = () => {
    const [open, setOpen] = useState(false)


    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Link href={'/'}>
                        <Button
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2, textTransform: 'none'}}
                        >
                            <ListAltOutlinedIcon/>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                MyTodoList
                            </Typography>
                        </Button>
                    </Link>

                    <Button color={'inherit'} sx={{ml: 'auto'}} onClick={handleOpen}>Login</Button>
                </Toolbar>
            </AppBar>

            <ModalComponent open={open} handleClose={handleClose}>
                <Login onCancel={handleClose}/>
            </ModalComponent>
        </Box>
    );
}
export default Navbar