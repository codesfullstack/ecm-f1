import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import App from './App.tsx';
import store from './store.js';
import './global.css';

const muiTheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </BrowserRouter>
);