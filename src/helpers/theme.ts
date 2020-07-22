import { createGlobalStyle, DefaultTheme } from "styled-components";

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

export const GlobalStyle = createGlobalStyle`
  body {
  color: ${(props) => props.theme.colors.secondary} !important;
  background-color: ${(props) => props.theme.colors.primary};
  }
  
  header,
  main {
    margin: 10px 10px 20px;
  }
  
  .ui.basic.button {
    color: ${(props) => props.theme.colors.secondary} !important;
    box-shadow: #B99B9B 0 0 0 1px inset !important;
  }
  
  .ui.basic.button:hover {
    background-color: ${(props) => props.theme.colors.secondary} !important;
    color: ${(props) => props.theme.colors.primary} !important;
    box-shadow: ${(props) =>
      props.theme.colors.primary} 0 0 1px inset !important;
  }
  
  .ui.checkbox.toggle label, .ui.checkbox.toggle.checked label {
    color: ${(props) => props.theme.colors.secondary} !important;
  }
  
  .ui.menu {
    border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
    background-color: ${(props) => props.theme.colors.primary} !important;
    color: ${(props) => props.theme.colors.secondary} !important;
  }
  
  .ui.menu a {
    color: inherit !important;
    font-weight: bold !important;
  }
  
  a {
    color: ${(props) => props.theme.colors.links.primary} !important;
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
    background-color: lightgray;
    padding: 10px;
    font-family: monospace;
  }`;
