import React, { useContext } from "react";
import { Checkbox, Input, Menu, Select } from "semantic-ui-react";
import { SetStateType, ThreadCatalogType } from "../../types";
import { BoardContext } from "./Board";
import { objectToDropdownItem } from "../../helpers/utils";

enum ThreadSortBy {
  LAST_BUMP = "lastBump",
  LAST_REPLY = "lastReply",
  CREATION_DATE = "creationDate",
  REPLY_COUNT = "replyCount",
}

interface BoardCatalogMenuProps {
  threads: ThreadCatalogType[];
  setThreads: SetStateType<ThreadCatalogType[]>;
  showOP: boolean;
  setShowOP: SetStateType<boolean>;
  refreshCatalog: () => void;
}
function BoardCatalogMenu({
  threads,
  setThreads,
  showOP,
  setShowOP,
  refreshCatalog,
}: BoardCatalogMenuProps) {
  const board = useContext(BoardContext);

  function filterThreads(query: string) {
    if (!board.threads) {
      return;
    }

    if (query && query.trim()) {
      setThreads(
        board.threads.filter((thread) =>
          ((thread.originalPost.body ?? "") + thread.subject)
            .toLowerCase()
            .includes(query.trim().toLowerCase())
        )
      );
    } else {
      setThreads(board.threads);
    }
  }

  function sortThreads(sort: ThreadSortBy) {
    let sortFn: (thread: ThreadCatalogType) => number | string;
    switch (sort) {
      case ThreadSortBy.LAST_REPLY:
        sortFn = (thread) => thread.lastReplyAt;
        break;
      case ThreadSortBy.CREATION_DATE:
        sortFn = (thread) => thread.createdAt;
        break;
      case ThreadSortBy.REPLY_COUNT:
        sortFn = (thread) => thread.statistics.replyCount;
        break;
      case ThreadSortBy.LAST_BUMP:
      default:
        sortFn = (thread) => thread.lastBumpAt;
        break;
    }

    threads.sort((t1, t2) => {
      if (t1.stickied || sortFn(t1) > sortFn(t2)) return -1;
      if (t2.stickied || sortFn(t1) < sortFn(t2)) return 1;
      return 0;
    });

    refreshCatalog();
  }

  return (
    <Menu borderless stackable>
      <Menu.Item>
        <label htmlFor="sortThreads">
          Sort by &nbsp;&nbsp;
          <Select
            name="sortThreads"
            labeled
            placeholder="Sort by"
            options={[
              objectToDropdownItem(ThreadSortBy.LAST_BUMP, "Last bump"),
              objectToDropdownItem(ThreadSortBy.LAST_REPLY, "Last reply"),
              objectToDropdownItem(ThreadSortBy.CREATION_DATE, "Creation date"),
              objectToDropdownItem(ThreadSortBy.REPLY_COUNT, "Reply count"),
            ]}
            defaultValue={ThreadSortBy.LAST_BUMP}
            onChange={(_, data) => sortThreads(data.value as ThreadSortBy)}
          />
        </label>
      </Menu.Item>
      <Menu.Item>
        <Checkbox
          toggle
          checked={showOP}
          onChange={() => setShowOP(!showOP)}
          label="Show OP?"
        />
      </Menu.Item>
      <Menu.Item position="right">
        <Input
          onChange={(_, data) => filterThreads(data.value)}
          placeholder="Search in threads..."
        />
      </Menu.Item>
    </Menu>
  );
}

export default BoardCatalogMenu;
