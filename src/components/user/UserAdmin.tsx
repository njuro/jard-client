import React, { useEffect, useState } from "react";
import { deleteApiRequest, getApiRequest } from "../../helpers/api";
import { USER_URL, USERS_URL } from "../../helpers/mappings";
import {
  Button,
  Checkbox,
  Confirm,
  Icon,
  Popup,
  Table
} from "semantic-ui-react";
import UserForm from "./UserForm";
import { UserType } from "../../types";

function UserAdmin() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    getApiRequest<UserType[]>(USERS_URL).then(setUsers);
  }

  function deleteUser(user: UserType) {
    deleteApiRequest(USER_URL(user)).then(fetchUsers);
  }

  const createUserButton = () => (
    <UserForm
      trigger={
        <Button basic size="small">
          <Icon name="plus" />
          <strong>New user</strong>
        </Button>
      }
    />
  );

  return (
    <>
      {createUserButton()}

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
                  <Button.Group>
                    <UserForm
                      trigger={
                        <Button basic icon>
                          <Popup
                            content="Edit"
                            position="top right"
                            trigger={<Icon name="edit outline" />}
                          />
                        </Button>
                      }
                      value={user}
                    />
                    <Confirm
                      trigger={
                        <Button basic icon>
                          <Popup
                            content="Delete"
                            position="top left"
                            trigger={<Icon name="trash alternate outline" />}
                          />
                        </Button>
                      }
                      header="Delete user"
                      content={`Are you sure you want to delete board ${user.username}?`}
                      confirmButton="Yes"
                      onConfirm={() => deleteUser(user)}
                      // TODO fix cancel button not closing dialog
                    />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      {createUserButton()}
    </>
  );
}

export default UserAdmin;
