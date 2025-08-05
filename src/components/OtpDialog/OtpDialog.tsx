import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { Input as BaseInput } from '@mui/base/Input';
import { Box, styled } from '@mui/system';

interface OtpDialogProps {
  open: boolean;
  onClose: () => void;
}

export const OtpDialog: React.FC<OtpDialogProps> = ({ open, onClose }) => {
  const [step, setStep] = useState<'generate' | 'verify'>('generate');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 'verify') {
      inputRefs.current[0]?.focus();
    }
  }, [step]);

  useEffect(() => {
    if (open) {
      setStep('generate');
      setOtp(Array(6).fill(''));
    }
  }, [open]);

  const handleGenerateOtp = () => {
    setLoading(true);
    console.log("OTP generado (simulado)");
    setTimeout(() => {
      setLoading(false);
      setStep('verify');
      setOtp(Array(6).fill(''));
    }, 1000);
  };

  const handleConfirm = () => {
    const code = otp.join('');
    console.log("OTP ingresado:", code);
    if (code !== "123456") {
      setErrorDialogOpen(true);
    } else {
      alert("Código correcto!");
      handleClose('confirm', code);
    }
  };

  const handleClose = (action: 'confirm' | 'cancel' | 'close', code?: string) => {
    console.log("Dialog closed with action:", action, "OTP:", code || '');
    setStep('generate');
    setOtp(Array(6).fill(''));
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const OTPInputs = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
      {Array.from({ length: 6 }).map((_, index) => (
        <BaseInput
          key={index}
          slots={{ input: InputElement }}
          slotProps={{
            input: {
              ref: (el: HTMLInputElement) => (inputRefs.current[index] = el),
              value: otp[index],
              onChange: (e) => handleChange(e, index),
              onKeyDown: (e) => handleKeyDown(e, index),
              id: `otp-${index}`,
              inputMode: 'numeric',
              autoComplete: 'one-time-code',
              maxLength: 1,
            },
          }}
        />
      ))}
    </Box>
  );

  const renderGenerateStep = () => (
    <>
      <DialogContent>
        <Typography>Presiona el botón para recibir un código de verificación.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose('cancel')} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleGenerateOtp} color="primary" disabled={loading}>
          {loading ? "Generando..." : "Generar OTP"}
        </Button>
      </DialogActions>
    </>
  );

  const renderVerifyStep = () => (
    <>
      <DialogContent>
        <Typography>Ingrese el código recibido:</Typography>
        {OTPInputs()}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose('cancel')} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          disabled={otp.some((digit) => digit === '')}
        >
          Continuar
        </Button>
      </DialogActions>
    </>
  );

  return (
    <>
      <Dialog open={open} onClose={() => handleClose('close')} maxWidth="xs" fullWidth>
        <DialogTitle>Autenticación de Dos Factores</DialogTitle>
        {step === 'generate' ? renderGenerateStep() : renderVerifyStep()}
      </Dialog>
      <Dialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography color="error">
            El código ingresado es incorrecto. Intenta nuevamente.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setErrorDialogOpen(false);
              setOtp(Array(6).fill(""));
              inputRefs.current[0]?.focus();
            }}
            color="primary"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputElement = styled('input')(
  ({ theme }) => `
    width: 40px;
    height: 40px;
    margin: 0 5px;
    font-size: 24px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      outline: none;
    }
  `
);
