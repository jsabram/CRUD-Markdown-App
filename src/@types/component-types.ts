type VoidFn = () => void;

export interface ChildrenProps {
	children: React.ReactNode;
}

export interface AppContextProps {
	isLightThemed: boolean;
	toggleThemeHandler: VoidFn;
}

// Resuable Components

interface ButtonProps {
	onClick: VoidFn;
}

export interface ColoredButtonProps extends ButtonProps {
	text: string;
	src: any;
}
