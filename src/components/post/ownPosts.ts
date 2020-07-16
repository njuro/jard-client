import {
  getFromLocalStorage,
  LocalStorageKey,
  saveToLocalStorage,
} from "../../helpers/localStorageItems";

export function isOwnPost(postNumber: number, boardLabel: string) {
  const ownPosts = getFromLocalStorage(LocalStorageKey.OWN_POSTS);
  return ownPosts && ownPosts[boardLabel]?.includes(postNumber);
}

export function addToOwnPosts(postNumber: number, boardLabel: string) {
  const ownPosts = getFromLocalStorage(LocalStorageKey.OWN_POSTS);
  if (ownPosts) {
    if (ownPosts[boardLabel]) {
      ownPosts[boardLabel].push(postNumber);
    } else {
      ownPosts[boardLabel] = [postNumber];
    }
    saveToLocalStorage(LocalStorageKey.OWN_POSTS, ownPosts);
  } else {
    saveToLocalStorage(LocalStorageKey.OWN_POSTS, {
      [boardLabel]: [postNumber],
    });
  }
}

export function markCrossLinksToOwnPosts() {
  Array.from(document.getElementsByClassName("crosslink")).forEach(
    (crosslink) => {
      if (crosslink.textContent?.endsWith(YOU)) {
        return;
      }
      if (crosslink instanceof HTMLElement) {
        const { postNumber, boardLabel } = crosslink.dataset;
        if (
          postNumber &&
          boardLabel &&
          isOwnPost(Number(postNumber), boardLabel)
        ) {
          const youMark = document.createTextNode(` ${YOU}`);
          crosslink.appendChild(youMark);
        }
      }
    }
  );
}

export const YOU = "(You)";
