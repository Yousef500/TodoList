import {Checkbox, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const Task = ({handleChecked, task, handleDelete, handleOpen}) => {
    return (
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
                            "&:hover": {overflow: "visible"},
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
                        <DeleteOutlineRoundedIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleOpen(index)}>
                        <EditOutlinedIcon/>
                    </IconButton>
                </Stack>
            </Grid>
        </ListItem>
    )
}

export default Task;