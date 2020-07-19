import { IconType } from "react-file-icon";
import { SemanticCOLORS, SemanticICONS } from "semantic-ui-react";

interface ProviderStyleProps {
  fileIcon: IconType;
  providerIcon: SemanticICONS;
  providerColor: SemanticCOLORS;
}
const providerStyles: Record<string, ProviderStyleProps> = {
  youtube: {
    fileIcon: "video",
    providerIcon: "youtube",
    providerColor: "red",
  },
  soundcloud: {
    fileIcon: "audio",
    providerIcon: "soundcloud",
    providerColor: "orange",
  },
  twitter: {
    fileIcon: "document",
    providerIcon: "twitter",
    providerColor: "blue",
  },
  default: {
    fileIcon: "binary",
    providerIcon: "server",
    providerColor: "grey",
  },
};

export default function getEmbeddedProviderStyle(
  providerName: string
): ProviderStyleProps {
  const providerStyle = providerStyles[providerName.toLowerCase()];
  return providerStyle ?? providerStyles.default;
}
