declare module "react-https-redirect" {
  interface HttpsRedirectProps {
    disabled?: boolean;
  }

  declare const HttpsRedirect: React.FunctionComponent<HttpsRedirectProps>;
  export default HttpsRedirect;
}
