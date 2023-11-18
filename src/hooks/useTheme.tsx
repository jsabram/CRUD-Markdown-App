export const useTheme = () => {
	let theme;
	const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
		.matches;

	const checkThemeHandler = () => {
		preferredTheme ? (theme = 'dark') : (theme = 'light');

		return theme;
	};

	return checkThemeHandler;
};
