import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import {AppBar, Box, Button, Toolbar, Typography,} from "@mui/material";
import Link from "next/link";
import Auth from "./auth";

const Navbar = () => {

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar>
                <Toolbar>
                    <Link href={"/"}>
                        <Button
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2, textTransform: "none"}}
                        >
                            <ListAltOutlinedIcon/>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                MyTodoList
                            </Typography>
                        </Button>
                    </Link>

                    <Auth/>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default Navbar;
