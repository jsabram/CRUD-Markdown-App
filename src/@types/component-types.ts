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
	areOptionsOpen: boolean;
	toggleOptionsHandler: VoidFn;
}

// Resuable Components

interface ButtonProps {
	onClick: VoidFn;
}

export interface ColoredButtonProps extends ButtonProps {
	src: any;
	text: string;
	className?: string;
}

export interface IconButtonProps
	extends ChildrenProps,
		ClassNameProps,
		ButtonProps {}

// Aside Menu + MavLink?

export interface LinkProps {
	id: string;
	title?: string;
	docName: string;
}
