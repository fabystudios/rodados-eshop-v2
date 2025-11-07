import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "../hooks/useThemeMode";

export default function ThemeToggle({ color = "inherit", size = "medium" }) {
  const theme = useTheme();
  const { toggleTheme } = useThemeMode();

  return (
    <Tooltip title={`Cambiar a modo ${theme.palette.mode === "dark" ? "claro" : "oscuro"}`}>
      <IconButton
        onClick={toggleTheme}
        color={color}
        size={size}
        sx={{
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "rotate(180deg)",
          },
        }}
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  );
}
