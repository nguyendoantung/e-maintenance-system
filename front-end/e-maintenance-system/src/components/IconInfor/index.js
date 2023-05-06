import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export default ({ title, children, ...props }) => {
  if (!title) return <IconButton size="small">{children}</IconButton>;
  return (
    <Tooltip title={title} {...props}>
      <IconButton size="small" aria-label={title}>
        {children}
      </IconButton>
    </Tooltip>
  );
};
