import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ModalComponent from "./modal";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box fluid="true">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ListAltOutlinedIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MyTodoList
            </Typography>
          </IconButton>

          <Button color={"inherit"} sx={{ ml: "auto" }} onClick={handleOpen}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <ModalComponent open={open} handleClose={handleClose}>
        Login
      </ModalComponent>
    </Box>
  );
};
export default Navbar;
