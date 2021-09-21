import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

function useThemeContext() {
  return useContext(ThemeContext);
}

export default useThemeContext;
