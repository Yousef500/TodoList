import {Button, Grid, IconButton, InputAdornment, Stack, TextField} from "@mui/material";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleIsNewUser = () => {
        setIsNewUser(!isNewUser)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleFormChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isNewUser) setFormValues({...formValues, username: ""})
        console.log(formValues)
    }

    return (
        <Stack spacing={1} component={'form'} alignItems={"center"} justifyContent={"center"} alignContent={"center"}
               onChange={handleFormChange}
               onSubmit={handleSubmit}
               sx={{mt: 2}}>
            {isNewUser && (
                <TextField
                    label={"Username"}
                    type={'text'}
                    fullWidth={true}
                    autoComplete={"off"}
                    name={'username'}
                />
            )}

            <TextField
                label={"Email"}
                type={'email'}
                fullWidth={true}
                name={'email'}
            />
            <TextField
                label={"Password"}
                type={showPassword ? 'text' : 'password'}
                fullWidth={true}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position={'end'}>
                            <IconButton onClick={handleShowPassword}>
                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                name={'password'}
            />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Button fullWidth={true} variant={'contained'} color={"secondary"} size={'large'} type={'submit'}>
                        Go
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button fullWidth={true} variant={'contained'} color={"warning"} size={'large'}>
                        Cancel
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Button fullWidth={true} variant={'text'} size={'large'} onClick={handleIsNewUser}>
                        {isNewUser ? "Already have an account? Login!" : "New? Sign up!"}
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default Login