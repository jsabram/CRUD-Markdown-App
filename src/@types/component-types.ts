type VoidFn = () => void;

export interface ClassNameProps {
	className: string;
}

export interface ChildrenProps {
	children: React.ReactNode;
}

export interface AppContextProps {
	isDarkThemed: boolean;
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
