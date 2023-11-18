type VoidFn = () => void;

export interface ChildrenProps {
	children: React.ReactNode;
}

export interface AppContextProps {
	isLightThemed: boolean;
	toggleThemeHandler: VoidFn;
}
