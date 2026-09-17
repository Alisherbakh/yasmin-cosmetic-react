import { Box, Container, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";


/** REDUX SELECTOR define process */
const topUsersRetriever = createSelector(
  retrieveTopUsers,
  (topUsers) => ({ topUsers })
);




export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever)
  return (
    <div className={"active-users-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"sec-tag"}>Community</Box>
          <Box className={"category-title"}>Loyal Customers</Box>
          <Stack className={"user-cards-frame"}>
            {topUsers.length !== 0 ? (
              topUsers.map((member: Member) => {
                const imagePath = member.memberImage
                  ? `${serverApi}/${member.memberImage}`
                  : "/icons/default-user.svg";
                return (
                  <Box key={member._id} className={"user-card"}>
                    <img className={"user-avatar-img"} src={imagePath} alt={member.memberNick} />
                    <Box className={"member-nickname"}>{member.memberNick}</Box>
                    <Box className={"member-points"}>{member.memberPoints} pts</Box>
                  </Box>
                );
              })
            ) : (
              <Box className="no-data">No Loyal Customers!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
