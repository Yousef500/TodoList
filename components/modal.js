import {Box, Modal} from "@mui/material";

const ModalComponent = ({open, handleClose, children}) => {
    const style = {
        position: 'absolute',
        top: '56%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {xs: '100%', sm: '65%', md: '45%'},
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{zIndex: 99, opacity: '50'}}
        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    )
}
export default ModalComponent