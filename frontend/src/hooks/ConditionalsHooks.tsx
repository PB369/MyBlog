import { useTheme } from "../context/ThemeContext"

export const useThemedIcon = (iconURL: string) => {
  return useCheckDarkMode() ? `/DarkIcons/${iconURL}` : `/LightIcons/${iconURL}`;
}

export const useCheckDarkMode = () => {
  const { theme } = useTheme();
  return theme === "light" ? false : true;
}