import { createTheme } from "@mui/material/styles";


// palette: https://coolors.co/palette/22577a-38a3a5-57cc99-80ed99-c7f9cc

export const theme = createTheme({
    palette: {
        primary: {
            main: "#57CC99"
        },
        secondary: {
            main: "#38A3A5"
        }
    },
    typography: {
        fontFamily: "Fredoka",
        h1: {
            fontWeight: 500
        },
        button: {
            color: "white",
            fontSize: 18,
            fontWeight: 300
        }
    }
})