import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    /* variables */
    :root {
        --nodes-aside-width: 364px;
    }

    *, *::after, *::before {
        box-sizing:border-box;
    }

    html, body {
        padding:0;
        margin:0;    

        font-family: 'Montserrat', sans-serif;
        font-size: var(18px);

        color: "#363636";
    }

    h1,h2,h3,h4,h5,button,label{
        font-family: 'Montserrat', sans-serif;
        margin:0;
    }
    p{
        margin:0;
    }

    a {
        text-decoration:none;
    }

    input, textarea {
        font-family: 'Montserrat', sans-serif;
    }
    
    button {
        cursor:pointer;
    }

    input, button {
        outline:none;
        border:none;
    }
`;
