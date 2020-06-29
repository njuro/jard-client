import React, { useEffect, useState } from "react";
import { Button, Icon, Popup, Table } from "semantic-ui-react";
import { getApiRequest } from "../../helpers/api";
import { BANS_URL } from "../../helpers/mappings";
import { BanStatus, BanType } from "../../types";
import BanForm from "./BanForm";
import UnbanForm from "./UnbanForm";

function BanAdmin() {
  const [bans, setBans] = useState<BanType[]>([]);

  useEffect(() => {
    fetchBans();
  }, []);

  function fetchBans() {
    getApiRequest<BanType[]>(BANS_URL).then(setBans);
  }

  function formatDate(date: string) {
    return new Date(date).toDateString();
  }

  const createBanButton = () => (
    <BanForm
      trigger={
        <Button basic size="small">
          <Icon name="plus" />
          <strong>New ban</strong>
        </Button>
      }
    />
  );

  return (
    <>
      {createBanButton()}

      <Table fixed striped>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>IP</Table.HeaderCell>
            <Table.HeaderCell>Banned by</Table.HeaderCell>
            <Table.HeaderCell>Reason</Table.HeaderCell>
            <Table.HeaderCell>Start</Table.HeaderCell>
            <Table.HeaderCell>End</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {bans.map((ban) => {
            return (
              <Table.Row key={ban.id} textAlign="center">
                <Table.Cell>{ban.ip}</Table.Cell>
                <Table.Cell>{ban.bannedBy?.username}</Table.Cell>
                <Table.Cell>{ban.reason}</Table.Cell>
                <Table.Cell>{formatDate(ban.start)}</Table.Cell>
                <Table.Cell>
                  {ban.end ? formatDate(ban.end) : "Never"}
                </Table.Cell>
                <Table.Cell>{ban.status}</Table.Cell>
                <Table.Cell>
                  {ban.status === BanStatus.ACTIVE && (
                    <Button.Group>
                      <BanForm
                        trigger={
                          <Button basic icon>
                            <Popup
                              content="Edit"
                              position="top right"
                              trigger={<Icon name="edit outline" />}
                            />
                          </Button>
                        }
                        value={ban}
                      />
                      <UnbanForm
                        trigger={
                          <Button basic icon>
                            <Popup
                              content="Unban"
                              position="top right"
                              trigger={<Icon name="unlock" />}
                            />
                          </Button>
                        }
                        value={ban}
                      />
                    </Button.Group>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      {createBanButton()}
    </>
  );
}

export default BanAdmin;
