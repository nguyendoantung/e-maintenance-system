import React from "react";
import { FileCopyOutlined } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default ({ text }) => {
  if (!text) return <span />;
  return (
    <CopyToClipboard text={text}>
      <Tooltip title="Copy">
        <IconButton size="small" aria-label="Copy">
          <FileCopyOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );
};
