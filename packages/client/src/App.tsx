import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { AuthButton } from "./features/auth/components/AuthButton";
import { store } from "./store/store";
import { theme } from "./theme";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Firebase Web App
              </Typography>
              <AuthButton />
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* Add your routes and content here */}
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to Firebase Web App Template
            </Typography>
            <Typography variant="body1">
              Start building your application by adding components and routes
              here.
            </Typography>
          </Container>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
