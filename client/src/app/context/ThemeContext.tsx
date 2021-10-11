import { ReactNode, useContext } from 'react';
import { ThemeContext as StyledThemeContext, ThemeProvider as StyledThemeProvider } from 'styled-components';

const initialTheme = {
  colors: {
    pink: '#ED315D',
    yellow: '#FFC847',
    green: '#05B384',
    blue: '#118AB2',
    darkBlue: '#073B4C',
    danger: '#DC3545',
    grey100: '#f8f9fa',
    grey200: '#e9ecef',
    grey300: '#dee2e6',
    grey400: '#ced4da',
    grey500: '#adb5bd',
    grey600: '#6c757d',
    grey700: '#495057',
    grey800: '#343a40',
    grey900: '#212529',
  },
  shadows: {
    createShadow: (d, b, s) => {
      function getDirection(dir) {
        switch (dir) {
          case 'up':
            return '0 -1px';
          case 'down':
            return '0 1px';
          case 'right':
            return '1px 0';
          case 'left':
            return '-1px 0';
          default:
            return '0 0';
        }
      }
      return `${getDirection(d)} ${b ?? '4px'} ${s ?? '0'} rgba(0,0,0,0.25)`;
    },
  },
  zIndex: {
    header: 100,
    drawerMenu: 50,
  },
  sizing: {
    menuHeight: 60,
  },
};

function useThemeContext(): { colors: { [key: string]: string } } {
  return useContext(StyledThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode}): JSX.Element {
  return (
    <StyledThemeProvider theme={initialTheme}>
      {children}
    </StyledThemeProvider>
  );
}

export default useThemeContext;
