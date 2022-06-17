import {Button, Stack, TextField} from "@mui/material";

const EditTask = ({handleClose, setTasks, setOpen, setEditTitle, setInd, editTitle, tasks, ind}) => {
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
        <>
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
                    sx={{"&:hover": {backgroundColor: "#00897b", color: "white"}}}
                    onClick={handleConfirm}
                    disabled={!editTitle}
                >
                    Confirm
                </Button>

                <Button
                    variant={"outlined"}
                    onClick={handleClose}
                    sx={{"&:hover": {backgroundColor: "#556cd6", color: "white"}}}
                >
                    Cancel
                </Button>
            </Stack>
        </>
    )
}

export default EditTask;