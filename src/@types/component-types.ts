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
	isMenuOpen: boolean;
	toggleMenuHandler: VoidFn;
}

// Resuable Components

interface ButtonProps {
	onClick: VoidFn;
}

export interface ColoredButtonProps extends ButtonProps {
	text: string;
	src: any;
}

export interface IconButtonProps
	extends ChildrenProps,
		ClassNameProps,
		ButtonProps {
	tooltipText: string;
}
