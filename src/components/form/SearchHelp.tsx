import React from "react";
import { List, Modal } from "semantic-ui-react";
import styled from "styled-components/macro";

const OperatorList = styled(List)`
  pre {
    display: inline;
  }
`;
function SearchHelp({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Modal closeIcon trigger={trigger}>
      <Modal.Header>Search help</Modal.Header>
      <Modal.Content>
        <p>The following search operators are available:</p>
        <OperatorList bulleted>
          <List.Item>
            <List.Header>AND ( + )</List.Header>
            Example: <pre>war + peace</pre> matches text containing both{" "}
            <em>war</em> and <em>peace</em>
          </List.Item>
          <List.Item>
            <List.Header>OR ( | )</List.Header>
            Example: <pre>apple | pear</pre> matches text containing{" "}
            <em>apple</em> and/or <em>pear</em>
          </List.Item>
          <List.Item>
            <List.Header>NOT (-)</List.Header>
            Example: <pre>-football</pre> matches text not containing{" "}
            <em>football</em>
          </List.Item>
          <List.Item>
            <List.Header>PREFIX (*)</List.Header>
            Example: <pre>anti*</pre> matches text containing{" "}
            <em>antivirus, antibiotics</em> etc.
          </List.Item>
          <List.Item>
            <List.Header>FUZZY / EDIT DISTANCE (~)</List.Header>
            Example: <pre>cat~2</pre> matches text containing{" "}
            <em>car, cap, cop</em> etc.
          </List.Item>
          <List.Item>
            <List.Header>PHRASE (&quot; &quot;)</List.Header>
            Example: <pre>&quot;bench press&quot;</pre> matches text where{" "}
            <em>bench</em> and <em>press</em> are next to each other
          </List.Item>
          <List.Item>
            <List.Header>NEAR (~)</List.Header>
            Example: <pre>&quot;good job&quot;~3</pre> matches text where{" "}
            <em>good</em> and <em>job</em> are at most 3 words apart
          </List.Item>
          <List.Item>
            <List.Header>PRECEDENCE (( ))</List.Header>
            Example: <pre>max + (width | height)</pre> matches text containing{" "}
            <em>max</em> and either <em>width</em> or <em>height</em>
          </List.Item>
        </OperatorList>
        <p>You can use multiple operators in the query.</p>
      </Modal.Content>
    </Modal>
  );
}

export default SearchHelp;
