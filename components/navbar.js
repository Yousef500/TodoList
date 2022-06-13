import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Login from "./login";
import ModalComponent from "./modal";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

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
      const { data } = await axios.post("/api/logout");
      handleMenuClose();
      localStorage.removeItem("user");
      setUsername("");
      toast.success("Successfully logged out");
    } catch (e) {
      console.log({ e });
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Link href={"/"}>
            <Button
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, textTransform: "none" }}
            >
              <ListAltOutlinedIcon />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                MyTodoList
              </Typography>
            </Button>
          </Link>

          {username ? (
            <Button sx={{ ml: "auto" }} color={"inherit"} onClick={handleMenu}>
              Welcome {username}!
            </Button>
          ) : (
            <Button color={"inherit"} onClick={handleOpen} sx={{ ml: "auto" }}>
              Login
            </Button>
          )}

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
        </Toolbar>
      </AppBar>

      <ModalComponent open={open} handleClose={handleClose}>
        <Login onCancel={handleClose} setUsername={setUsername} />
      </ModalComponent>
    </Box>
  );
};
export default Navbar;
