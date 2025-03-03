type ClassName = string | false | undefined | null;

export function concatenateClassNames(...classes: ClassName[]): string {
	return classes.join(" ");
}

export function formatString(num: number): string {
	return num.toString().padStart(2, "0");
}
