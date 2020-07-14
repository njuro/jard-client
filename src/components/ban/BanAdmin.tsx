import React, { useContext, useEffect, useState } from "react";
import { Button, Icon, Popup, Table } from "semantic-ui-react";
import { getApiRequest } from "../../helpers/api";
import { BANS_URL } from "../../helpers/mappings";
import { BanStatus, BanType } from "../../types";
import BanForm from "./BanForm";
import UnbanForm from "./UnbanForm";
import { formatTimestamp } from "../../helpers/utils";
import { DashboardContext } from "../dashboard/Dashboard";
import { DASHBOARD_ITEM_BANS } from "../dashboard/DashboardMenu";

function BanAdmin() {
  const { setActiveDashboardItem } = useContext(DashboardContext);

  const [bans, setBans] = useState<BanType[]>([]);

  useEffect(() => {
    setActiveDashboardItem(DASHBOARD_ITEM_BANS);
    fetchBans();
  }, [setActiveDashboardItem]);

  function fetchBans() {
    getApiRequest<BanType[]>(BANS_URL).then(setBans);
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
            <Table.HeaderCell>Valid from</Table.HeaderCell>
            <Table.HeaderCell>Valid to</Table.HeaderCell>
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
                <Table.Cell>{formatTimestamp(ban.validFrom)}</Table.Cell>
                <Table.Cell>
                  {ban.validTo ? formatTimestamp(ban.validTo) : "Never"}
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
