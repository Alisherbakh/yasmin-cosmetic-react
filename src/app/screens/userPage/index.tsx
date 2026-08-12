import { Box, Container, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Settings } from "./Settings";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import "../../../css/userPage.css";
import { serverApi } from "../../../lib/config";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  if (!authMember) history.push("/");
  return (
    <div className={"user-page"}>
      <Container>
        <Box className={"page-title"}>My page</Box>
        <Stack className={"my-page-frame"} flexDirection={"row"}>
          <Stack className={"my-page-left"}>
            <Box className={"card"}>
              <h3>Edit your details</h3>
              <Settings />
            </Box>
          </Stack>

          <Stack className={"my-page-right"}>
            <Box className={"card profile-card"}>
              <img
                src={ authMember?.memberImage
                  ? `${serverApi}/${authMember.memberImage}`
                  : "/icons/default-user.svg"
                }
                className={"profile-avatar"}
              />
              <div className={"profile-name"}>{authMember?.memberNick}</div>
              <div className={"profile-type"}>{authMember?.memberType}</div>
              <div className={"profile-addr"}>
                <LocationOnIcon sx={{ fontSize: 16 }} />
                {authMember?.memberAddress
                 ? authMember.memberAddress
                 : "No address"}
              </div>
              <p className={"profile-bio"}>{authMember?.memberDesc
                ? authMember.memberDesc
                : "No description"
                }</p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
