import {
	isPermissionGranted,
	requestPermission,
	sendNotification,
} from "@tauri-apps/plugin-notification";

type ClassName = string | false | undefined | null;

export function concatenateClassNames(...classes: ClassName[]): string {
	return classes.join(" ");
}

export function formatString(num: number): string {
	return num.toString().padStart(2, "0");
}

let notificationPermission: boolean;

(async () => {
	notificationPermission = await isPermissionGranted();
	if (!notificationPermission) {
		const permission = await requestPermission();
		notificationPermission = permission === "granted";
	}
})();

export async function notify(title: string, body?: string) {
	if (notificationPermission) {
		const audio = new Audio("/notification.mp3");
		audio.play();
		sendNotification({
			title,
			body,
			sound: "default",
			icon: "src-tauri/icons/32x32.png",
		});
	}
}
