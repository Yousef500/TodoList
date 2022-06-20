import {Button, Grid, IconButton, InputAdornment, Stack, TextField,} from "@mui/material";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import {toast} from "react-toastify";

const Login = ({onCancel, setUsername}) => {
        const {
            register,
            handleSubmit,
            getValues,
            watch,
            formState: {errors},
        } = useForm({
            mode: "onSubmit",
        });
        const [showPassword, setShowPassword] = useState(false);
        const [isNewUser, setIsNewUser] = useState(false);
        const [loading, setLoading] = useState(false);
        const [verifiedEmail, setVerifiedEmail] = useState(false);
        const [secretCode, setSecretCode] = useState(0);

        const handleIsNewUser = () => {
            setIsNewUser(!isNewUser);
        };

        const handleShowPassword = () => {
            setShowPassword(!showPassword);
        };

        const handleCodeCheck = () => {
            setLoading(true);
            const code = Number(getValues('code'));
            if (code === secretCode) {
                setVerifiedEmail(true);
                toast.success('Email verified')
            } else {
                setVerifiedEmail(false);
                toast.error('Wrong code');
            }
            setLoading(false);
        }

        const handleVerifyEmail = async () => {
            setLoading(true);
            const email = getValues('email');
            if (email) {
                try {
                    const {data} = await axios.post(`/api/verify-email`, {email});
                    setSecretCode(Number(data.number))
                    toast.success('Email sent')
                } catch (e) {
                    console.log({e});
                    toast.error('Something went wrong');
                }
            } else {
                toast.error("Please fill in your email to verify");
            }
            setLoading(false)
        }

        const handleOnSubmit = async (data) => {
            setLoading(true);
            if (isNewUser && verifiedEmail) {
                const {username, email, password} = data;
                try {
                    const response = await axios.post("/api/register", {
                        username,
                        email,
                        password,
                    });
                    onCancel();
                    toast.success("User created successfully");
                    localStorage.setItem("user", JSON.stringify(response.data.username));
                    setUsername(response.data.username);
                } catch (e) {
                    toast.error(e.response?.data.message || "Something went wrong");
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
                    localStorage.setItem("user", JSON.stringify(response.data.username));
                    setUsername(response.data.username);
                } catch (e) {
                    toast.error(e.response?.data.message);
                    console.log(e.message);
                }
            }
            setLoading(false);
        };

        return (
            <Stack
                spacing={1}
                component={"form"}
                justifyContent={"center"}
                alignContent={"center"}
                onSubmit={handleSubmit(handleOnSubmit)}
                sx={{mt: 2}}
                padding={1}
            >
                {isNewUser ? <Stack direction={'row'} justifyContent={'space-evenly'} spacing={1}>
                        <TextField
                            fullWidth={true}
                            autoFocus={true}
                            type={"email"}
                            {...register("email", {
                                required: "Email is required",
                            })}
                            label="Email"
                            error={!!errors?.email}
                            helperText={errors.email ? `${errors.email.message}` : ""}
                            disabled={(verifiedEmail && isNewUser)}
                        />
                        <LoadingButton
                            loading={loading}
                            variant={'contained'}
                            color={'success'}
                            onClick={handleVerifyEmail}
                            disabled={(verifiedEmail && isNewUser)}
                        >
                            Verify
                        </LoadingButton>
                    </Stack>
                    : <TextField
                        autoFocus={true}
                        fullWidth={true}
                        type={"email"}
                        {...register("email", {
                            required: "Email is required",
                        })}
                        label="Email"
                        error={!!errors?.email}
                        helperText={errors.email ? `${errors.email.message}` : ""}
                        disabled={(verifiedEmail && isNewUser)}
                    />
                }

                {isNewUser && (
                    <>
                        <Stack alignItems={'center'} spacing={1} direction={'row'} justifyContent={'flex-start'}>
                            <TextField
                                {...register("code", {
                                    required: "code is required",
                                })}
                                label="Code"
                                error={!!errors?.code}
                                helperText={errors.code ? `${errors.code.message}` : ""}
                                disabled={(verifiedEmail && isNewUser) || !watch('email')}
                                size={"small"}
                                type={'number'}
                            />
                            <Button
                                variant={'contained'}
                                color={'primary'}
                                disabled={(verifiedEmail && isNewUser) || !watch('email')}
                                onClick={handleCodeCheck}
                            >
                                Check
                            </Button>
                        </Stack>

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
                            disabled={(!verifiedEmail && isNewUser)}
                        />
                    </>
                )}

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
                    disabled={(!verifiedEmail && isNewUser)}
                />
                <Grid container spacing={1} paddingRight={1.5}>
                    <Grid item xs={6}>
                        <LoadingButton
                            fullWidth={true}
                            variant={"outlined"}
                            sx={{"&:hover": {backgroundColor: "#19857b", color: "white"}}}
                            color={"secondary"}
                            size={"large"}
                            type={"submit"}
                            loading={loading}
                            disabled={(isNewUser && !verifiedEmail)}
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
    }
;

export default Login;
