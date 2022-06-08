import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
    Box,
    Button,
    Checkbox,
    Grid, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
} from "@mui/material";
import Head from "next/head";
import {useEffect, useState} from "react";
import ModalComponent from "../components/modal";
import Navbar from "../components/navbar";

export default function Home() {
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
                setNewTask({title: "", done: false});
            }
        }
    };

    const handleInputChange = (e) => {
        setNewTask({title: e.target.value, done: false});
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

    return (
        <Box sx={{overflowX: 'hidden'}}>
            <Head>
                <title>TodoList</title>
                <meta name="description" content="A todo list app with login"/>
            </Head>

            <Navbar/>
            <Grid
                container
                sx={{flexGrow: 1}}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={11.5} lg={7} m={"auto"} mt={10}>
                    <TextField
                        fullWidth
                        label="new task"
                        variant={"filled"}
                        onChange={handleInputChange}
                        onKeyUp={handleNewTask}
                        value={newTask.title}
                    />
                </Grid>
                <Grid item xs={12} lg={7} marginX={1}>
                    <List sx={{width: "100%"}}>
                        {tasks.map((task, index) => {
                            return (
                                <Grid
                                    key={index}
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                    alignContent={'center'}
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
                                                        '&:hover': {overflow: 'visible'}
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
                                                sx={{
                                                    height: 100,
                                                }}
                                            >
                                                <IconButton
                                                    color={"error"}
                                                    onClick={() => handleDelete(index)}
                                                >
                                                    <DeleteOutlineRoundedIcon/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleOpen(index)}
                                                >
                                                    <EditOutlinedIcon/>
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
                        onClick={handleConfirm}
                        disabled={!editTitle}
                    >
                        Confirm
                    </Button>

                    <Button variant={"outlined"} onClick={handleClose}>
                        Cancel
                    </Button>
                </Stack>
            </ModalComponent>
        </Box>
    );
}
