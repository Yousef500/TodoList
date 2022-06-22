import {
    Box,
    Button,
    Grid,
    Icon,
    IconButton,
    InputAdornment,
    Stack,
    Step, StepContent, StepContext,
    StepLabel,
    Stepper,
    TextField, Typography,
} from "@mui/material";
import {useState} from "react";
import {AccountBoxOutlined, Visibility, VisibilityOff} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import {toast} from "react-toastify";
import GoogleLogin from "./googleLogin";

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
        const [secretCode, setSecretCode] = useState(0);
        const [activeStep, setActiveStep] = useState(0);
        const [completed, setCompleted] = useState({0: {done: false}, 1: {done: false}})

        const handleIsNewUser = () => {
            setIsNewUser(!isNewUser);
            setActiveStep(0);
        };

        const handleShowPassword = () => {
            setShowPassword(!showPassword);
        };

        const handleVerifyEmail = async () => {
            setLoading(true);
            const email = getValues('email');
            if (email) {
                try {
                    const {data} = await axios.post(`/api/verify-email`, {email});
                    setSecretCode(Number(data.number))
                    toast.success('Email sent')
                    setCompleted({
                        ...completed,
                        [activeStep]: {done: true}
                    })
                    setActiveStep((prevState) => prevState + 1)
                } catch (e) {
                    toast.error(e.response.data.message || 'Something went wrong');
                }
            } else {
                toast.error("Please fill in your email to verify");
            }
            setLoading(false)
        }

        const handleCodeCheck = () => {
            setLoading(true);
            const code = Number(getValues('code'));
            if (code === secretCode) {
                toast.success('Email verified')
                setCompleted({
                    ...completed,
                    [activeStep]: {done: true}
                })
                setActiveStep(2);
            } else {
                toast.error('Wrong code');
            }
            setLoading(false);
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
                padding={1}
            >
                <AccountBoxOutlined sx={{alignSelf: 'center', mb: 1, fontSize: 80}} color={'primary'}/>
                {
                    isNewUser ? (
                        <Box sx={{width: '100%'}}>
                            <Stepper activeStep={activeStep}>
                                <Step completed={completed[0].done}>
                                    <StepLabel>Verify email</StepLabel>
                                </Step>
                                <Step completed={completed[1].done}>
                                    <StepLabel>Enter Code</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>Last step</StepLabel>
                                </Step>
                            </Stepper>

                            <Grid container spacing={1} mt={2}>
                                {activeStep === 0 ?
                                    <Grid item xs={12}>
                                        <Stack direction={'row'} justifyContent={'space-evenly'} spacing={1}>
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
                                            />
                                            <LoadingButton
                                                loading={loading}
                                                variant={'contained'}
                                                color={'success'}
                                                onClick={handleVerifyEmail}
                                            >
                                                Next
                                            </LoadingButton>
                                        </Stack>
                                        <Button
                                            fullWidth={true}
                                            variant={"text"}
                                            size={"large"}
                                            color={'inherit'}
                                            sx={{mt: 1}}
                                            onClick={handleIsNewUser}
                                        >
                                            Already have an account? Login!
                                        </Button>
                                    </Grid> :
                                    activeStep === 1 ? <Grid item xs={12}>
                                            <Stack alignItems={'center'} spacing={1} direction={'row'}
                                                   justifyContent={'flex-start'}>
                                                <TextField
                                                    {...register("code", {
                                                        required: "code is required",
                                                    })}
                                                    label="Code"
                                                    error={!!errors?.code}
                                                    helperText={errors.code ? `${errors.code.message}` : ""}
                                                    size={"small"}
                                                    type={'number'}
                                                />
                                                <Button
                                                    variant={'contained'}
                                                    color={'success'}
                                                    onClick={handleCodeCheck}
                                                >
                                                    Next
                                                </Button>
                                            </Stack>
                                        </Grid> :
                                        activeStep === 2 &&
                                        <>
                                            <Grid item xs={12}>
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
                                            </Grid>
                                            <Grid item xs={12}>
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
                                            </Grid>
                                            <Grid item xs={6}>
                                                <LoadingButton
                                                    fullWidth={true}
                                                    variant={"contained"}
                                                    color={"success"}
                                                    size={"large"}
                                                    type={"submit"}
                                                    loading={loading}
                                                >
                                                    Finish
                                                </LoadingButton>
                                            </Grid>

                                            <Grid item xs={6}>
                                                <Button
                                                    fullWidth={true}
                                                    variant={"text"}
                                                    color={"warning"}
                                                    size={"large"}
                                                    onClick={onCancel}
                                                >
                                                    Cancel
                                                </Button>
                                            </Grid>
                                        </>
                                }
                            </Grid>
                        </Box>
                    ) : (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus={true}
                                    fullWidth={true}
                                    type={"email"}
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                    label="Email"
                                    error={!!errors?.email}
                                    helperText={errors.email ? `${errors.email.message}` : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                            <Grid item xs={6}>
                                <LoadingButton
                                    fullWidth={true}
                                    variant={"contained"}
                                    color={"primary"}
                                    size={"large"}
                                    type={"submit"}
                                    loading={loading}
                                >
                                    Login
                                </LoadingButton>
                            </Grid>

                            <Grid item xs={6}>
                                <Button
                                    fullWidth={true}
                                    variant={"outlined"}
                                    color={"warning"}
                                    size={"large"}
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>

                            <Grid item xs={6}>
                                <Button
                                    fullWidth={true}
                                    variant={"text"}
                                    size={"large"}
                                    color={'inherit'}
                                    onClick={handleIsNewUser}
                                >
                                    New? Sign up!
                                </Button>
                            </Grid>
                            <Grid item xs={6}><GoogleLogin/></Grid>
                        </Grid>
                    )
                }
            </Stack>
        );
    }
;

export default Login;
