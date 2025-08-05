import React, { useState } from "react";
import { Button } from "@mui/material";
import { OtpDialog } from "./components/OtpDialog/OtpDialog";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Abrir Dialog OTP
      </Button>
      <OtpDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default App;
