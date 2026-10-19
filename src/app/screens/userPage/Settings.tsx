import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";

export function Settings() {
  const { authMember, setAuthMember} = useGlobals();
  const [memberimage, setMemberImage] = useState<string>(
    authMember?.memberImage 
    ? `${serverApi}/${authMember.memberImage}` 
    : "/icons/default-user.svg"
  );

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
    memberPhone: authMember?.memberPhone,
    memberPassword:authMember?.memberPassword,
    memberAddress: authMember?.memberAddress,
    memberDesc: authMember?.memberDesc,
    memberImage: authMember?.memberImage,
    }
  )
  const [saving, setSaving] = useState<boolean>(false);

  /** HANDLERS **/
  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };
   
  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };
  
  const memberDescriptionHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };


  const handleSubmitButton = async () => {
    try{
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" || 
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }

      setSaving(true);
      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSuccessAlert("Modified successfully!", 700);

    }catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    } finally {
      setSaving(false);
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files?.[0];
    if (!file) return; // file picker was cancelled
    const fileType = file.type,
     validateImageTypes = ["image/jpg","image/jpeg","image/png"]


    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(new Error(Messages.error5)).then();
    } else {
      if(file) {
        memberUpdateInput.memberImage = file;
        setMemberUpdateInput({...memberUpdateInput});
        setMemberImage(URL.createObjectURL(file));
      }
    }
  };




  return (
    <Box className={"settings"}>
      <Box className={"avatar-row"}>
        <img src={memberimage} className={"avatar-lg"} alt={"Profile"} />
        <Box className={"avatar-meta"}>
          <span>JPG, JPEG, PNG formats only</span>
          <Button component="label" className={"upload-btn"} onChange={handleImageViewer}>
            <CloudDownloadIcon sx={{ fontSize: 16, mr: "6px" }} />
            Upload image
            <input type="file" accept={"image/png, image/jpeg"} hidden />
          </Button>
        </Box>
      </Box>
      <Box className={"field"}>
        <label className={"field-label"}>Username</label>
        <input
          className={"mb-nick"}
          type="text"
          placeholder={authMember?.memberNick}
          value={memberUpdateInput.memberNick}
          name="memberNick"
          onChange={memberNickHandler}
        />
      </Box>
      <Box className={"field-row"}>
        <Box className={"field"}>
          <label className={"field-label"}>Phone</label>
          <input
            className={"mb-phone"}
            type="text"
            placeholder={authMember?.memberPhone ?? "no phone"}
            value={memberUpdateInput.memberPhone}
            name="memberPhone"
            onChange={memberPhoneHandler}
          />
        </Box>
        <Box className={"field"}>
          <label className={"field-label"}>Address</label>
          <input
            className={"mb-address"}
            type="text"
            placeholder={authMember?.memberAddress
              ? authMember.memberAddress
              : "no address"}
            value={memberUpdateInput.memberAddress}
            name="memberAddress"
            onChange={memberAddressHandler}
          />
        </Box>
      </Box>
      <Box className={"field"}>
        <label className={"field-label"}>Description</label>
        <textarea
          className={"mb-description"}
          placeholder={authMember?.memberDesc
            ? authMember.memberDesc
            : "no description"}
          value={memberUpdateInput.memberDesc}
          name="memberDesc"
          onChange={memberDescriptionHandler}
        />
      </Box>
      <Box className={"save-box"}>
        <Button className={"save-btn"} onClick={handleSubmitButton} disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </Box>
    </Box>
  );
}
