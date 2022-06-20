import {Box, Grid, Stack, TextField,} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Head from "next/head";
import {useEffect, useState} from "react";
import ModalComponent from "../components/modal";
import Navbar from "../components/navbar";
import axios from "axios";
import {toast} from "react-toastify";
import TodoList from "../components/todoList";
import EditTask from "../components/editTask";
import {AddTask, DownloadForOffline} from "@mui/icons-material";

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
                const {data} = await axios.get("/api/authorize");
                localStorage.setItem("user", JSON.stringify(data.username));
            } catch (e) {
                console.log({e});
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

    const handleSaveList = async () => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const todo = JSON.parse(localStorage.getItem("todo"));
        if (user) {
            try {
                const {data} = await axios.post("/api/save-list", {
                    list: todo,
                });
                toast.success("Successfully saved the list");
            } catch (e) {
                console.error(e.response.data.message);
                toast.error("Something went wrong, please make sure you're logged in");
            }
        } else {
            toast.info("Please log in first.");
        }
        setLoading(false);
    };

    const handleImportList = () => {
        console.log('import')
    }

    return (
        <Box sx={{overflowX: "hidden"}}>
            <Head>
                <title>TodoList</title>
                <meta name="description" content="A todo list app with login"/>
            </Head>

            <Navbar/>
            <Grid
                container
                sx={{flexGrow: 1}}
                spacing={2}
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                mt={20}
                padding={1}
            >
                <Grid item xs={12} sm={7} m={'auto'}>
                    <Stack direction={'row'} spacing={1} justifyContent={'space-between'}>

                        <LoadingButton
                            variant="text"
                            color={"success"}

                            disableRipple
                            sx={{
                                "&:hover": {background: "none", textDecoration: "underline"},
                                padding: 0
                            }}
                            onClick={handleSaveList}
                            loading={loading}
                            endIcon={<AddTask/>}
                        >
                            Save
                        </LoadingButton>

                        <LoadingButton
                            loading={loading}
                            variant="text"
                            color={"primary"}
                            disableRipple
                            sx={{
                                "&:hover": {background: "none", textDecoration: "underline"},
                                padding: 0
                            }}
                            onClick={handleImportList}
                            endIcon={<DownloadForOffline/>}
                        >
                            Import
                        </LoadingButton>
                    </Stack>
                </Grid>

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
                    <TodoList tasks={tasks} handleChecked={handleChecked} handleDelete={handleDelete}
                              handleOpen={handleOpen}/>
                </Grid>
            </Grid>

            <ModalComponent open={open} handleClose={handleClose}>
                <EditTask handleClose={handleClose} editTitle={editTitle} tasks={tasks} setEditTitle={setEditTitle}
                          ind={ind} setInd={setInd} setTasks={setTasks} setOpen={setOpen}/>
            </ModalComponent>
        </Box>
    );
}
