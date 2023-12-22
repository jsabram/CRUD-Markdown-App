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
	openMenuHandler: VoidFn;
	closeMenuHandler: VoidFn;
	areOptionsOpen: boolean;
	toggleOptionsHandler: VoidFn;
	selectedView: string;
	changeViewHandler: ChangeViewFn;
	isDeleteModalOpen: boolean;
	openDeleteModalHandler: VoidFn;
	closeDeleteModalHandler: VoidFn;
	isCreateModalOpen: boolean;
	openCreateModalHandler: VoidFn;
	closeCreateModalHandler: VoidFn;
}

// Resizeable

export interface ResizableBoxProps extends ChildrenProps {
	direction: 'horizontal';
}

// Resuable Components

interface ButtonProps {
	onClick: VoidFn;
}

export interface ColoredButtonProps extends ButtonProps {
	id: string;
	src: any;
	text: string;
	className?: string;
	disabled?: boolean;
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

// Modal

export interface ModalMessageProps extends ChildrenProps {
	title: string;
	message: string;
	onConfirm: VoidFn;
}

export interface ModalBackgroundProps {
	onCancel: VoidFn;
}

export interface ModalButtonsProps {
	onCancel: VoidFn;
	onConfirm: VoidFn;
	disabled?: boolean;
}

export interface ModalProps extends ModalMessageProps, ModalBackgroundProps {}

// store

interface DocumentObj {
	id: string;
	createdAt: string;
	title: string;
	body: string;
}

export interface StateObj {
	editorValue: string;
	savedValue: string;
	userId: string;
	userDocs: DocumentObj[];
	openDoc: string;
}
