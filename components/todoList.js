import {Grid, List} from "@mui/material";
import Task from "./task";

const TodoList = ({tasks, handleChecked, handleDelete, handleOpen}) => {
    return (
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
                        <Task task={task} handleOpen={handleOpen} handleDelete={handleDelete}
                              handleChecked={handleChecked}/>
                    </Grid>
                );
            })}
        </List>
    )
}

export default TodoList;