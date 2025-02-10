import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EventImage from "../assets/Images/19198080.jpg";
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Alert,
  Stack,
  Link,
  Box,
} from "@mui/material";

const SignUp = () => {
  // navigate
  const navigate = useNavigate();

  // toggling the password
  const [showPassword, setShowPassword] = useState(false);
  const ToggleShowPassword = () => setShowPassword((prev) => !prev);

  // userName and password
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Showing Alert Messages for userName and Password
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // success alertmessage and error alertmessage
  const [openAlert, setOpenAlert] = useState(false);
  const [success, setSuccess] = useState("");

  // Alert close
  const alertCloseFn = () => {
    setTimeout(() => {
      setOpenAlert(false);
    }, 2000);
  };

  // api call for posting user data to server for storage
  const postData = async () => {
    const user = {
      email: userName,
      pass: password,
    };
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    const data = await res.json();
    setOpenAlert(true);
    setAlertMessage(data.message);
    setSuccess(data.success);
    if (data.success === "ok") return navigate("/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (userName !== "" && password !== "") {
      if (
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName) &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password)
      ) {
        setIsSubmitted(false);
        postData();
        setUserName("");
        setPassword("");
      }
    }
  };

  return (
    <Stack
      direction={{xs:'column',md:'row'}}
      justifyContent={"space-around"}
      spacing={10}
      alignItems={"center"}
      sx={{
        boxSizing: "border-box",
        maxWidth:1360,
        mx:'auto',
        my:7,
        width:'100%',
        p: "25px",
        backgroundImage: "linear-gradient(skyblue,lightgray)",
        borderRadius: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent:'center',
          maxWidth: "400px",
          width: "100%",
          p:'15px 60px',
          borderRadius: 5,
        }}
      >
        <Typography variant="h4" fontWeight='bold' mb={2} sx={{alignSelf:'flex-start'}}>
          Sign up
        </Typography>

        <TextField
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Email address*"
          type="text"
          variant="outlined"
          color="warning"
          fullWidth
          sx={{ mt: 2, width:'100%', "& .MuiOutlinedInput-root": { '& fieldset':{border:'none'},borderRadius: 8,backgroundColor:'white',border:'none' } }}
          size="medium"
        />
        {isSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName) && (
          <Alert severity="error" sx={{ width: "90%", mt: 1,borderRadius:8 }}>
            Provide a valid email
          </Alert>
        )}

        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          color="warning"
          placeholder="Password*"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          sx={{ mt: 3, width:'100%','& .MuiOutlinedInput-root':{ '& fieldset':{border:'none'}, borderRadius:8,backgroundColor:'white'} }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={ToggleShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {isSubmitted &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password) && (
            <Alert severity="error" sx={{ width: "90%", mt: 1, borderRadius:8 }}>
              Provide a valid password
            </Alert>
          )}

        <Button
          variant="contained"
          onClick={handleSubmit}
          color="success"
          sx={{
            width: "100%",
            mt: 4,
            color: "white",
            borderRadius:8
          }}
          size="large"
        >
          Continue
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          color="warning"
          sx={{
            width: "100%",
            mt: 3,
            color: "white",
            borderRadius:8
          }}
          size="large"
        >
          Guest Login
        </Button>

        <Stack
          spacing={1}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={3}
        >
          <Typography variant="subtitle1">Already have an account?</Typography>
          <Link
            component={"button"}
            color="info"
            onClick={() => navigate("/login")}
            underline="always"
            sx={{fontSize:'17px', fontWeight:'bold', ":hover": { color: "red" } }}
          >
            Login
          </Link>
        </Stack>

        

        {openAlert && (
          <Alert
            severity={success === "ok" ? "success" : "error"}
            variant="outlined"
            sx={{ width: "90%", mt: 1, borderRadius:8 }}
            onClose={alertCloseFn()}
          >
            {alertMessage}
          </Alert>
        )}
      </Box>

      <Box
        component={"img"}
        src={EventImage}
        width={{xs:'100%',md:'55%'}}
        height="auto"
        alt="event mangement"
        borderRadius={10}
      />
    </Stack>
  );
};

export default SignUp;
