import {
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
    color: ${secondaryColor} !important;
  }

  a:hover {
    color: ${(props) => props.theme.colors.links.hover} !important;
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
  }

  span.spoiler:hover {
    color: white;
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
  }

  .ui.basic.button:hover {
    background-color: ${secondaryColor} !important;
    color: ${primaryColor} !important;
    box-shadow: ${primaryColor} 0 0 1px inset !important;
  }

  .ui.checkbox.toggle label,
  .ui.checkbox.toggle.checked label {
    color: ${secondaryColor} !important;
  }

  .ui.menu {
    box-shadow: ${secondaryColor} 0 0 1px inset !important;
    background-color: ${primaryColor} !important;
    color: ${secondaryColor} !important;
  }

  .ui.menu a {
    color: inherit !important;
    font-weight: bold !important;
  }

  .ui.menu .item {
    box-shadow: ${secondaryColor} 0 0 1px inset !important;
  }
  
`;
