import React, { useState } from "react";
import { Button } from "@mui/material";
import { OtpDialog } from "./components/OtpDialog/OtpDialog";

function App() {
  const [open, setOpen] = useState(false);

  const handleClose = (otp: string) => {
    if (otp) {
      if (otp !== "123456") {
        alert("Código incorrecto")
      } else {
        alert("Código correcto!");
      }
    } 
    setOpen(false);
  };


  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Abrir Dialog OTP
      </Button>
      <OtpDialog open={open} onClose={handleClose} config={{
        title: "Verificación de Seguridad",
        messageOne: "Vamos a enviarte un código por correo electrónico.",
        messageTwo: "Por favor ingresa el código para continuar.",
        sendButton: "Enviar Código"
      }} apiUrl="http://www.randomnumberapi.com/api/v1.0/random?min=000000&max=999999&count=1" />
    </>
  );
}

export default App;
