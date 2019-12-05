import React, { useEffect, useState } from "react";
import { getApiRequest } from "../../helpers/api";
import { USERS_URL } from "../../helpers/mappings";
import { Checkbox, Icon, Popup, Table } from "semantic-ui-react";

function UserAdmin(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getApiRequest(USERS_URL).then(setUsers);
  }, []);

  return (
    <Table fixed striped>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>E-mail</Table.HeaderCell>
          <Table.HeaderCell>Role</Table.HeaderCell>
          <Table.HeaderCell>Enabled</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map(user => {
          return (
            <Table.Row key={user.username} textAlign="center">
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>
                <Checkbox disabled checked={user.enabled} />
              </Table.Cell>
              <Table.Cell>
                <Popup
                  content="Edit"
                  position="top right"
                  trigger={<Icon name="edit outline" />}
                />
                <Popup
                  content="Delete"
                  position="top left"
                  trigger={<Icon name="trash alternate outline" />}
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export default UserAdmin;
