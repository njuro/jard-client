import styled, {
  createGlobalStyle,
  DefaultTheme,
  ThemeProps,
} from "styled-components/macro";

export const theme: DefaultTheme = {
  colors: {
    primary: "#222222",
    secondary: "#b99b9b",
    greentext: "#82A259",
    reply: "rgba(0, 0, 0, 0.25)",
    links: {
      primary: "#7c7e7c",
      hover: "#8e748f",
    },
  },
};

export const primaryColor = (props: ThemeProps<DefaultTheme>) =>
  props.theme.colors.primary;
export const secondaryColor = (props: ThemeProps<DefaultTheme>) =>
  props.theme.colors.secondary;

export const GlobalStyle = createGlobalStyle`
  * {
    max-width: 100%;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }

  body {
    color: ${secondaryColor} !important;
    background-color: ${primaryColor};
  }

  header,
  main {
    margin: 10px 10px 20px;
  }

  a {
    color: ${(props) => props.theme.colors.links.primary} !important;

    :hover {
      color: ${(props) => props.theme.colors.links.hover} !important;
    }
  }

  label {
    color: ${secondaryColor} !important;
  }

  a.crosslink {
    text-decoration: underline;
    text-decoration-style: dashed;
  }

  a.deadlink {
    text-decoration: line-through;
    cursor: pointer;
  }

  span.greentext {
    color: ${(props) => props.theme.colors.greentext};
  }

  span.spoiler {
    background-color: black;
    color: black;

    :hover {
      color: white;
    }
  }

  div.code {
    background-color: ${secondaryColor};
    color: ${primaryColor};
    padding: 10px;
    font-family: monospace;
  }

  .ui.basic.button {
    color: ${secondaryColor} !important;
    box-shadow: ${secondaryColor} 0 0 0 1px inset !important;

    :active,
    :focus {
      background: ${primaryColor} !important;
      color: ${secondaryColor} !important;
      box-shadow: ${secondaryColor} 0 0 0 1px inset !important;
    }

    :hover {
      background-color: ${secondaryColor} !important;
      color: ${primaryColor} !important;
      box-shadow: ${primaryColor} 0 0 1px inset !important;
    }
  }

  .ui.checkbox.toggle {
    & > label {
      color: ${secondaryColor} !important;
      ::before {
        background-color: ${(props) => props.theme.colors.reply} !important;
      }
      ::after {
        background-color: ${secondaryColor} !important;
      }
    }

    input:checked,
    input:checked:focus,
    input:checked:active {
      & ~ label {
        color: ${secondaryColor} !important;

        ::before {
          background-color: lightgrey !important;
        }
      }
    }
  }

  .ui.input input,
  .field textarea,
  .ui.selection.dropdown,
  .ui.selection.dropdown .menu {
    background-color: ${secondaryColor} !important;
    color: ${primaryColor} !important;
    border-color: unset !important;

    ::placeholder,
    :focus::placeholder {
      color: white;
    }

    :focus,
    input:focus {
      border-color: unset !important;
    }

    .item {
      border-top-color: grey !important;
    }
  }

  .ui.divider {
    color: ${secondaryColor} !important;
  }

  .ui.menu {
    &.borderless .item {
      box-shadow: none !important;
    }

    box-shadow: ${secondaryColor} 0 0 1px inset !important;
    background-color: ${primaryColor} !important;
    color: ${secondaryColor} !important;

    a {
      color: inherit !important;
      font-weight: bold !important;
    }

    .item {
      box-shadow: ${secondaryColor} 0 0 1px inset !important;

      &.active {
        background-color: rgba(0, 0, 0, 0.2) !important;
      }
    }
  }

  .ui.segment {
    box-shadow: ${secondaryColor} 0 0 1px inset !important;
    background-color: ${primaryColor} !important;
  }

  .ui.modal,
  .ui.modal > .content,
  .ui.modal > .actions,
  .ui.modal > .header {
    background-color: ${primaryColor} !important;
  }

  .ui.dividing.header,
  .ui.modal > .header {
    border-bottom-color: ${secondaryColor};
    color: ${secondaryColor} !important;
  }

  .ui.popup,
  .ui.popup::before {
    border-color: whitesmoke !important;
    background-color: whitesmoke !important;
  }
`;

// Prettier doesn't support createGlobalStyle, so copy CSS from above here, format it and copy back
// noinspection JSUnusedLocalSymbols
const globalStyleFormatter = styled.div``; // eslint-disable-line @typescript-eslint/no-unused-vars
