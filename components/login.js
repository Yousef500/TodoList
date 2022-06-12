import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
} from "@mui/material";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import {toast} from "react-toastify";
import jwt from "jsonwebtoken";

const Login = ({onCancel}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onSubmit",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleIsNewUser = () => {
        setIsNewUser(!isNewUser);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const storeUser = ({data}) => {
        const user = jwt.decode(data.token);
        localStorage.setItem('user', JSON.stringify({
            token: data.token,
            refreshToken: data.refreshToken,
            username: user.username,
            email: user.email
        }));
    }

    const handleOnSubmit = async (data) => {
        setLoading(true);
        if (isNewUser) {
            const {username, email, password} = data;
            try {
                const response = await axios.post("/api/register", {
                    username,
                    email,
                    password,
                });
                onCancel();
                toast.success("User created successfully");
                storeUser(response);

            } catch (e) {
                toast.error(e.response.data.message);
            }
        } else {
            const {email, password} = data;
            try {
                const response = await axios.post("/api/login", {
                    email,
                    password,
                });
                onCancel();
                toast.success("Logged in successfully");
                storeUser(response);

            } catch (e) {
                toast.error(e.response?.data.message);
                console.log(e.message)
            }
        }
        setLoading(false);
    };

    return (
        <Stack
            spacing={1}
            component={"form"}
            alignItems={"center"}
            justifyContent={"center"}
            alignContent={"center"}
            onSubmit={handleSubmit(handleOnSubmit)}
            sx={{mt: 2}}
        >
            {isNewUser && (
                <TextField
                    type={"text"}
                    fullWidth={true}
                    autoComplete={"off"}
                    {...register("username", {
                        required: "Username is required",
                    })}
                    label="Username"
                    error={!!errors?.username}
                    helperText={errors.username ? `${errors.username.message}` : ""}
                />
            )}

            <TextField
                type={"email"}
                fullWidth={true}
                {...register("email", {
                    required: "Email is required",
                })}
                label="Email"
                error={!!errors?.email}
                helperText={errors.email ? `${errors.email.message}` : ""}
            />
            <TextField
                type={showPassword ? "text" : "password"}
                fullWidth={true}
                label="Password"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position={"end"}>
                            <IconButton onClick={handleShowPassword}>
                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                {...register("password", {
                    required: "Password is required",
                })}
                error={!!errors?.password}
                helperText={errors.password ? `${errors.password.message}` : ""}
            />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <LoadingButton
                        fullWidth={true}
                        variant={"outlined"}
                        sx={{"&:hover": {backgroundColor: "#19857b", color: "white"}}}
                        color={"secondary"}
                        size={"large"}
                        type={"submit"}
                        loading={loading}
                    >
                        Go
                    </LoadingButton>
                </Grid>

                <Grid item xs={6}>
                    <Button
                        fullWidth={true}
                        variant={"outlined"}
                        color={"warning"}
                        size={"large"}
                        onClick={onCancel}
                        sx={{"&:hover": {backgroundColor: "#ef6c00", color: "white"}}}
                    >
                        Cancel
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        fullWidth={true}
                        variant={"text"}
                        sx={{"&:hover": {backgroundColor: "#556cd6", color: "white"}}}
                        size={"large"}
                        onClick={handleIsNewUser}
                    >
                        {isNewUser ? "Already have an account? Login!" : "New? Sign up!"}
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default Login;
