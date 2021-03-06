import { IconType } from "react-file-icon";
import { SemanticCOLORS, SemanticICONS } from "semantic-ui-react";

interface ProviderStyleProps {
  fileIcon: IconType;
  providerIcon: SemanticICONS;
  providerColor: SemanticCOLORS;
  thumbnailPlaceholderUrl?: string;
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
    thumbnailPlaceholderUrl: "/assets/twitter-logo.png",
  },
  codepen: {
    fileIcon: "code",
    providerIcon: "codepen",
    providerColor: "grey",
  },
  reddit: {
    fileIcon: "presentation",
    providerIcon: "reddit alien",
    providerColor: "orange",
    thumbnailPlaceholderUrl: "/assets/reddit-logo.png",
  },
  vimeo: {
    fileIcon: "video",
    providerIcon: "vimeo",
    providerColor: "green",
    thumbnailPlaceholderUrl: "/assets/vimeo-logo.png",
  },
  codesandbox: {
    fileIcon: "code",
    providerIcon: "code",
    providerColor: "black",
  },
  scribd: {
    fileIcon: "document",
    providerIcon: "scribd",
    providerColor: "teal",
  },
  tiktok: {
    fileIcon: "video",
    providerIcon: "video camera",
    providerColor: "black",
  },
  spotify: {
    fileIcon: "audio",
    providerIcon: "spotify",
    providerColor: "green",
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
