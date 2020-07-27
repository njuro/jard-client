import React from "react";
import styled from "styled-components/macro";
import { Divider } from "semantic-ui-react";

const FooterContainer = styled.footer`
  padding: 10px;
  text-align: center;
  font-size: smaller;
  font-style: oblique;
`;
function Footer() {
  return (
    <FooterContainer>
      <Divider />
      <p>
        Disclaimer: All trademarks, copyrights, comments, and images on this
        page are owned by and are the responsibility of their respective
        parties.
      </p>
      <p>
        Powered by jard imageboard software. Source code:{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/njuro/jard"
        >
          API server
        </a>
        ,{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/njuro/jard-client"
        >
          client
        </a>
        .
      </p>
    </FooterContainer>
  );
}

export default Footer;
