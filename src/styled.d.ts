import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      greentext: string;
      reply: string;
      links: {
        primary: string;
        hover: string;
      };
    };
  }
}
