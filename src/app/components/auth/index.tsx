import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Message } from "@mui/icons-material";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
  switchToLogin: () => void;
  switchToSignup: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const {
    signupOpen,
    loginOpen,
    handleSignupClose,
    handleLoginClose,
    switchToLogin,
    switchToSignup,
  } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();


  /** HANDLERS **/

  const handleUsername = (e: T) => {
    console.log(e.target.value);
    setMemberNick(e.target.value);
  };
  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };
  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen){
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen){
      handleLoginRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      
      const isFullfill = memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFullfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      // Saving Authenticated user
      setAuthMember(result);
      handleSignupClose();
      sweetTopSmallSuccessAlert(`Welcome, ${result.memberNick}!`, 1500);

    } catch(err){
      // keep the form open so the user can fix the input
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      
      const isFullfill = memberNick !== "" && memberPassword !== "";
      if (!isFullfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      // Saving Authenticated user
      setAuthMember(result);
      handleLoginClose();
      sweetTopSmallSuccessAlert(`Welcome back, ${result.memberNick}!`, 1500);

    } catch(err){
      // keep the form open so the user can fix the input
      console.log(err);
      sweetErrorHandling(err).then();
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "800px", maxWidth: "92vw", boxSizing: "border-box" }}
          >
            <ModalImg className={"auth-modal-img"} src={"/img/auth.webp"} alt="camera" />
            <Stack sx={{ marginLeft: { xs: 0, sm: "69px" }, flex: { xs: 1, sm: "initial" }, alignItems: "center" }}>
              <h2 id="signup-modal-title">Signup Form</h2>
              <TextField
                sx={{ marginTop: "7px" }}
                id="signup-username"
                label="username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                sx={{ my: "17px" }}
                id="signup-phone"
                label="phone number"
                variant="outlined"
                onChange={handlePhone}
              />
              <TextField
                id="signup-password"
                label="password"
                variant="outlined"
                type="password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "30px", width: "120px" }}
                variant="extended"
                color="primary"
                onClick={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
              <p className={"auth-switch"}>
                Already have an account? <span onClick={switchToLogin}>Login</span>
              </p>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "700px", maxWidth: "92vw", boxSizing: "border-box" }}
          >
            <ModalImg className={"auth-modal-img"} src={"/img/auth.webp"} alt="camera" />
            <Stack
              sx={{
                marginLeft: { xs: 0, sm: "65px" },
                marginTop: { xs: 0, sm: "25px" },
                flex: { xs: 1, sm: "initial" },
                alignItems: "center",
              }}
            >
              <h2 id="login-modal-title">Login Form</h2>
              <TextField
                id="login-username"
                label="username"
                variant="outlined"
                sx={{ my: "10px" }}
                onChange={handleUsername}
              />
              <TextField
                id={"login-password"}
                label={"password"}
                variant={"outlined"}
                type={"password"}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "27px", width: "120px" }}
                variant={"extended"}
                color={"primary"}
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
              <p className={"auth-switch"}>
                Don't have an account? <span onClick={switchToSignup}>Sign up</span>
              </p>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
