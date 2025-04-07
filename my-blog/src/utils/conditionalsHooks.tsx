import { useTheme } from "../context/ThemeContext"

export const useThemedIcon = (iconURL: string) => {
  return useCheckDarkMode() ? `../../public/darkIcons/${iconURL}` : `../../public/lightIcons/${iconURL}`;
}

export const useCheckDarkMode = () => {
  const { theme } = useTheme();
  return theme === "light" ? false : true;
}