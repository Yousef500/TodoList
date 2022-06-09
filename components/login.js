import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";

const Login = ({ onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const handleIsNewUser = () => {
    setIsNewUser(!isNewUser);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnSubmit = (data) => {
    if (!isNewUser) data.username = "";
    console.log(data);
  };

  return (
    <Stack
      spacing={1}
      component={"form"}
      alignItems={"center"}
      justifyContent={"center"}
      alignContent={"center"}
      onSubmit={handleSubmit(handleOnSubmit)}
      sx={{ mt: 2 }}
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
                {showPassword ? <Visibility /> : <VisibilityOff />}
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
          <Button
            fullWidth={true}
            variant={"contained"}
            color={"secondary"}
            size={"large"}
            type={"submit"}
          >
            Go
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            fullWidth={true}
            variant={"contained"}
            color={"warning"}
            size={"large"}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth={true}
            variant={"text"}
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
