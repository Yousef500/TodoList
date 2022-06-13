import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Head from "next/head";
import { useEffect, useState } from "react";
import ModalComponent from "../components/modal";
import Navbar from "../components/navbar";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    done: false,
  });
  const [ind, setInd] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleOpen = (index) => {
    const originalTask = tasks.find((task, id) => id === index);
    setEditTitle(originalTask.title);
    setInd(index);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setInd(null);
    setEditTitle("");
  };

  useEffect(() => {
    if (localStorage.getItem("todo")) {
      const initialTasks = JSON.parse(localStorage.getItem("todo"));
      setTasks(initialTasks);
    }

    const handleAuthorization = async () => {
      try {
        const { data } = await axios.get("/api/authorize");
        localStorage.setItem("user", JSON.stringify(data.username));
      } catch (e) {
        console.log({ e });
        localStorage.removeItem("user");
      }
    };

    handleAuthorization();
  }, []);

  const handleChecked = (index) => {
    const newTasks = tasks.map((task, id) => {
      if (id === index) {
        task.done = !task.done;
      }
      return task;
    });

    setTasks(newTasks);
    localStorage.setItem("todo", JSON.stringify(newTasks));
  };

  const handleNewTask = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      if (newTask.title) {
        setTasks([...tasks, newTask]);
        localStorage.setItem("todo", JSON.stringify([...tasks, newTask]));
        setNewTask({ title: "", done: false });
      }
    }
  };

  const handleInputChange = (e) => {
    setNewTask({ title: e.target.value, done: false });
  };

  const handleDelete = (key) => {
    const newTasks = tasks.filter((task, index) => index !== key);
    setTasks(newTasks);
    localStorage.setItem("todo", JSON.stringify(newTasks));
  };

  const handleEdit = (e) => {
    setEditTitle(e.target.value);
  };

  const handleConfirm = () => {
    const newTasks = tasks.map((task, id) => {
      if (id === ind) {
        task.title = editTitle;
      }
      return task;
    });

    setTasks(newTasks);
    localStorage.setItem("todo", JSON.stringify(newTasks));
    setOpen(false);
    setEditTitle("");
    setInd(null);
  };

  const handleSaveList = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const todo = JSON.parse(localStorage.getItem("todo"));
    if (user) {
      try {
        const { data } = await axios.post("/api/save-list", {
          list: todo,
        });
        toast.success("Successfully saved the list");
      } catch (e) {
        console.error(e.response.data.message);
        toast.error("Something went wrong");
      }
    } else {
      toast.info("Please log in first.");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Head>
        <title>TodoList</title>
        <meta name="description" content="A todo list app with login" />
      </Head>

      <Navbar />
      <Grid
        container
        sx={{ flexGrow: 1 }}
        justifyContent="center"
        alignItems="center"
        alignContent="center"
      >
        <Grid
          item
          xs={12}
          sm={1.5}
          md={1.5}
          mt={20}
          mb={2}
          sx={{ marginLeft: { xs: 0, sm: 17, md: 9 } }}
        >
          <LoadingButton
            variant="text"
            color={"success"}
            fullWidth
            disableRipple
            sx={{
              "&:hover": { background: "none", textDecoration: "underline" },
            }}
            onClick={handleSaveList}
            loading={loading}
          >
            Save List
          </LoadingButton>
        </Grid>

        <Grid item xs={0} sm={8} md={7}></Grid>

        <Grid item xs={12} sm={7} m={"auto"}>
          <TextField
            fullWidth
            label="new task"
            variant={"filled"}
            onChange={handleInputChange}
            onKeyUp={handleNewTask}
            value={newTask.title}
          />
        </Grid>
        <Grid item xs={12} sm={7} marginX={1}>
          <List>
            {tasks.map((task, index) => {
              return (
                <Grid
                  key={index}
                  container
                  justifyContent="center"
                  alignItems="center"
                  alignContent={"center"}
                >
                  <ListItem disablePadding={true}>
                    <Grid item xs={10} md={11}>
                      <ListItemButton onClick={() => handleChecked(index)}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={task.done}
                            disableRipple
                            color={"secondary"}
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            textDecoration: task.done ? "line-through" : "none",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            "&:hover": { overflow: "visible" },
                          }}
                          primary={`${task.title}`}
                        />
                      </ListItemButton>
                    </Grid>
                    <Grid item xs={2} md={1}>
                      <Stack
                        direction={"row"}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          color={"error"}
                          onClick={() => handleDelete(index)}
                        >
                          <DeleteOutlineRoundedIcon />
                        </IconButton>
                        <IconButton onClick={() => handleOpen(index)}>
                          <EditOutlinedIcon />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </ListItem>
                </Grid>
              );
            })}
          </List>
        </Grid>
      </Grid>

      <ModalComponent open={open} handleClose={handleClose}>
        <TextField
          fullWidth
          label="edit task"
          variant={"filled"}
          onChange={(e) => handleEdit(e)}
          value={editTitle}
          onKeyUp={(e) => e.key === "Enter" && handleConfirm()}
          autoFocus={true}
        />

        <Stack direction={"row"} marginTop={2} spacing={1}>
          <Button
            color={"secondary"}
            variant={"outlined"}
            sx={{ "&:hover": { backgroundColor: "#00897b", color: "white" } }}
            onClick={handleConfirm}
            disabled={!editTitle}
          >
            Confirm
          </Button>

          <Button
            variant={"outlined"}
            onClick={handleClose}
            sx={{ "&:hover": { backgroundColor: "#556cd6", color: "white" } }}
          >
            Cancel
          </Button>
        </Stack>
      </ModalComponent>
    </Box>
  );
}
