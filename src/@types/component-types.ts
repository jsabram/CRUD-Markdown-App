type VoidFn = () => void;

export interface ClassNameProps {
	className: string;
}

export interface ChildrenProps {
	children: React.ReactNode;
}

type ViewMode = 'editor' | 'preview' | 'comparison';

export type ChangeViewFn = (value: ViewMode) => void;

export interface AppContextProps {
	isDarkThemed: boolean;
	toggleThemeHandler: VoidFn;
	isMenuOpen: boolean;
	toggleMenuHandler: VoidFn;
	closeMenuHandler: VoidFn;
	areOptionsOpen: boolean;
	toggleOptionsHandler: VoidFn;
	selectedView: string;
	changeViewHandler: ChangeViewFn;
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

export interface SectionHeaderProps {
	sectionTitle: string;
}

// Aside Menu + MavLink?

export interface LinkProps {
	id: string;
	title?: string;
	docName: string;
}
