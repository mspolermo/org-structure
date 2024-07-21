import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '24' | '32';
type DivProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>, HTMLDivElement
>;

export interface FlexProps extends DivProps {
	className?: string;
	children: ReactNode;
	justify?: FlexJustify;
	align?: FlexAlign;
	gap?: FlexGap;
	direction: FlexDirection;
	max?: boolean;
	maxHeight?: boolean
}

