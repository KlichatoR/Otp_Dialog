import React, { useState } from "react";
import { Button } from "@mui/material";
import { OtpDialog } from "./components/OtpDialog/OtpDialog";

function App() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (otp: string) => {
    if (otp == "123456") {
      alert("Código incorrecto")
    } else {
      setOpen(false);
      alert("Código correcto!");
    }
  }


  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Abrir Dialog OTP
      </Button>
      <OtpDialog open={open} onConfirm={handleConfirm} onCancel={handleClose} onError={(err) => {
        {
          alert("Error: " + err);
        }
      }} config={{
        title: "Verificación de Seguridad",
        messageOne: "Vamos a enviarte un código por correo electrónico.",
        messageTwo: "Por favor ingresa el código para continuar.",
        sendButton: "Enviar Código"
      }} apiUrl="https://www.random.org/integers/?num=1&min=000000&max=999999&col=1&base=10&format=plain&rnd=new" />
    </>
  );
}

export default App;
