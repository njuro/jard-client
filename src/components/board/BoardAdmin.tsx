import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Confirm,
  Icon,
  Popup,
  Table,
} from "semantic-ui-react";
import { Helmet } from "react-helmet";
import {
  apiErrorHandler,
  deleteApiRequest,
  getApiRequest,
} from "../../helpers/api";
import {
  BOARD_URL,
  BOARDS_URL,
  DASHBOARD_MANAGE_BOARDS_URL,
} from "../../helpers/mappings";
import { BoardType } from "../../types";
import BoardForm from "./BoardForm";
import useUpdater from "../../helpers/useUpdater";
import { capitalize } from "../../helpers/utils";
import { DashboardContext } from "../dashboard/Dashboard";
import LoadingIndicator from "../utils/LoadingIndicator";

function BoardAdmin() {
  const { setActiveDashboardPath } = useContext(DashboardContext);

  const [boards, setBoards] = useState<BoardType[]>([]);
  const [deleteFormOpen, setDeleteFormOpen] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const refreshList = useUpdater();

  useEffect(() => {
    setActiveDashboardPath(DASHBOARD_MANAGE_BOARDS_URL);
    fetchBoards();
  }, [setActiveDashboardPath]);

  function fetchBoards() {
    setLoading(true);
    getApiRequest<BoardType[]>(BOARDS_URL)
      .then(setBoards)
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  }

  function deleteBoard(board: BoardType) {
    deleteApiRequest(BOARD_URL(board)).then(() => {
      fetchBoards();
      refreshList();
    });
  }

  const createBoardButton = () => (
    <BoardForm
      trigger={
        <Button basic size="small">
          <Icon name="plus" />
          <strong>New board</strong>
        </Button>
      }
    />
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Helmet title="Manage boards" />
      {createBoardButton()}

      <Table fixed striped>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Label</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Attachments</Table.HeaderCell>
            <Table.HeaderCell>NSFW</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {boards.map((board) => {
            return (
              <Table.Row key={board.label} textAlign="center">
                <Table.Cell>/{board.label}/</Table.Cell>
                <Table.Cell>{board.name}</Table.Cell>
                <Table.Cell>
                  {board.settings.attachmentCategories
                    .map((category) => capitalize(category.name))
                    .join(", ")}
                </Table.Cell>
                <Table.Cell>
                  <Checkbox disabled checked={board.settings.nsfw} />
                </Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <BoardForm
                      trigger={
                        <Button basic icon>
                          <Popup
                            content="Edit"
                            position="top right"
                            trigger={<Icon name="edit outline" />}
                          />
                        </Button>
                      }
                      value={board}
                    />
                    <Button
                      basic
                      icon
                      onClick={() => setDeleteFormOpen(board.label)}
                    >
                      <Popup
                        content="Delete"
                        position="top left"
                        trigger={<Icon name="trash alternate outline" />}
                      />
                    </Button>
                    <Confirm
                      open={deleteFormOpen === board.label}
                      header="Delete board"
                      content={`Are you sure you want to delete board /${board.label}/?`}
                      confirmButton="Yes"
                      onConfirm={() => {
                        deleteBoard(board);
                        setDeleteFormOpen(undefined);
                      }}
                      onCancel={() => setDeleteFormOpen(undefined)}
                    />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      {createBoardButton()}
    </>
  );
}

export default BoardAdmin;
