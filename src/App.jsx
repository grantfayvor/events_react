import React from 'react';
import { ThemeProvider } from "react-css-themr";
import theme from "./react-toolbox/theme";
import Home from "./components/Home";

export default function (props) {
    return (
        <ThemeProvider theme={theme}><Home /></ThemeProvider>
    )
}