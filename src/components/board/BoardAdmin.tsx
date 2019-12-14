import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Confirm,
  Icon,
  Popup,
  Table
} from "semantic-ui-react";
import { deleteApiRequest, getApiRequest } from "../../helpers/api";
import { BOARD_URL, BOARDS_URL } from "../../helpers/mappings";
import BoardForm from "./BoardForm";
import { BoardType } from "../../types";

function BoardAdmin() {
  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    fetchBoards();
  }, []);

  function fetchBoards() {
    getApiRequest<BoardType[]>(BOARDS_URL).then(setBoards);
  }

  function deleteBoard(board: BoardType) {
    deleteApiRequest(BOARD_URL(board)).then(fetchBoards);
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

  return (
    <>
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
          {boards.map(board => {
            return (
              <Table.Row key={board.label} textAlign="center">
                <Table.Cell>/{board.label}/</Table.Cell>
                <Table.Cell>{board.name}</Table.Cell>
                <Table.Cell>{board.attachmentType}</Table.Cell>
                <Table.Cell>
                  <Checkbox disabled checked={board.nsfw} />
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
                      header="Delete board"
                      content={`Are you sure you want to delete board /${board.label}/?`}
                      confirmButton="Yes"
                      onConfirm={() => deleteBoard(board)}
                      // TODO fix cancel button not closing dialog
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
