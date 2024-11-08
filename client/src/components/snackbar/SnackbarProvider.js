import { useRef } from "react";
import { SnackbarProvider as NotistackProvider } from "notistack";
import { alpha } from "@mui/material/styles";
import { Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SnackbarProvider({ children }) {
  const notistackRef = useRef(null);

  const onClose = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>

      <NotistackProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        iconVariant={{
          info: <SnackbarIcon icon="eva:info-fill" color="info" />,
          success: (
            <SnackbarIcon icon="eva:checkmark-circle-2-fill" color="success" />
          ),
          warning: (
            <SnackbarIcon icon="eva:alert-triangle-fill" color="warning" />
          ),
          error: <SnackbarIcon icon="eva:alert-circle-fill" color="error" />,
        }}
        // With close as default
        action={(key) => (
          <IconButton size="small" onClick={() => onClose(key)} sx={{ p: 0.5 }}>
            <CloseIcon />
          </IconButton>
        )}
      >
        {children}
      </NotistackProvider>
    </>
  );
}

function SnackbarIcon({ icon, color }) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        justifyContent: "center",
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      }}
    >
      <CloseIcon />
    </Box>
  );
}
