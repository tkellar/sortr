import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

function useThemeContext(): { colors: { [key: string]: string } } {
  return useContext(ThemeContext);
}

export default useThemeContext;
