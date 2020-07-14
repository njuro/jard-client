import React, { useContext, useEffect, useState } from "react";
import { Message } from "semantic-ui-react";
import styled from "styled-components";
import { BanType } from "../../types";
import { getApiRequest } from "../../helpers/api";
import { BANS_URL } from "../../helpers/mappings";
import { formatTimestamp } from "../../helpers/utils";
import { AppContext } from "../App";

const BanMessage = styled(Message)`
  margin: auto !important;
  width: 50%;
`;
function BanStatus() {
  const { setActiveMenuItem } = useContext(AppContext);

  const [ban, setBan] = useState<BanType>();
  const [banLoading, setBanLoading] = useState<boolean>(true);

  useEffect(() => {
    setActiveMenuItem(undefined);

    getApiRequest<BanType>(`${BANS_URL}/me`)
      .then(setBan)
      .finally(() => setBanLoading(false));
  }, [setActiveMenuItem]);

  if (banLoading) {
    return <BanMessage>Fetching your ban info...</BanMessage>;
  }

  if (ban) {
    return (
      <BanMessage
        error
        header="You are banned"
        list={[
          "Your IP is banned from posting on all boards",
          `Reason: ${ban.reason}`,
          `Your ban will expire on: ${
            ban.validTo ? formatTimestamp(ban.validTo) : "Never"
          }`,
        ]}
      />
    );
  }

  return (
    <BanMessage positive>
      <Message.Header>Your IP is not banned</Message.Header>
      <p>You can post as usual</p>
    </BanMessage>
  );
}

export default BanStatus;
