import React, { useEffect, useState } from "react";
import { Message } from "semantic-ui-react";
import styled from "styled-components";
import { BanType } from "../../types";
import { getApiRequest } from "../../helpers/api";
import { BANS_URL } from "../../helpers/mappings";

function BanStatus() {
  const [ban, setBan] = useState<BanType>();
  const [banLoading, setBanLoading] = useState<boolean>(true);

  useEffect(() => {
    getApiRequest<BanType>(`${BANS_URL}/me`)
      .then(setBan)
      .finally(() => setBanLoading(false));
  }, []);

  const BanMessage = styled(Message)`
    margin: auto !important;
    width: 50%;
  `;

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
            ban.end ? new Date(ban.end).toDateString() : "Never"
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