import React from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Controller, useFormContext } from "react-hook-form";
import { isLocalhost } from "../../helpers/utils";

interface CaptchaProps {
  name: string;
}
function Captcha({ name }: CaptchaProps) {
  const DUMMY_SITE_KEY = "10000000-ffff-ffff-ffff-000000000001";

  const { setError, clearErrors } = useFormContext();

  if (isLocalhost()) {
    return (
      <div style={{ padding: "5px" }}>
        CAPTCHA does not work on localhost. Consider settings alias in
        /etc/hosts or similiar
      </div>
    );
  }

  return (
    <Controller
      name={name}
      render={({ onChange }) => (
        <HCaptcha
          sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY ?? DUMMY_SITE_KEY}
          size="normal"
          theme="dark"
          onVerify={(token) => {
            onChange(token);
            clearErrors(name);
          }}
          onError={(error) => {
            setError(name, {
              type: "validate",
              message: `Captcha returned error: ${error}`,
            });
            onChange(undefined);
          }}
          onExpire={() => {
            setError(name, {
              type: "validate",
              message: "Captcha has expired",
            });
            onChange(undefined);
          }}
        />
      )}
    />
  );
}

export default Captcha;
