import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
    palette: {
        mode: "dark",
    },
    typography: {
        fontSize: 12,
    },
})
theme = responsiveFontSizes(theme);
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const styleTextInput = {
    margin: 1, display: 'block', justifyContent: 'center', alignItems: 'center', flexGrow: 1
};

export { theme, styleModal, styleTextInput }