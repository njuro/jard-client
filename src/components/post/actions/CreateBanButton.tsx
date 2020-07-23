import React, { useContext } from "react";
import { Button, Icon } from "semantic-ui-react";
import useAuthority from "../../../helpers/useAuthority";
import { UserAuthority } from "../../../types";
import BanForm from "../../ban/BanForm";
import { PostContext } from "../Post";

function CreateBanButton() {
  const { post } = useContext(PostContext);

  if (!useAuthority(UserAuthority.MANAGE_BANS)) {
    return null;
  }

  // TODO popup not working
  return (
    <BanForm
      trigger={<Button basic circular size="mini" icon={<Icon name="ban" />} />}
      ip={post.ip}
    />
  );
}

export default CreateBanButton;
