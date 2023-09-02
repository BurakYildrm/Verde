"use client";

import { Post } from "@/store/postSlice";

export enum StorageKeyEnum {
	POSTS = "POSTS",
}

type StorageKeyTypeMap = {
	[StorageKeyEnum.POSTS]: Post[];
};

export const setLocalStorageItem = <K extends StorageKeyEnum>(
	storageKey: K,
	data: StorageKeyTypeMap[K]
): void => {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.setItem(storageKey, JSON.stringify(data));
};

export const updateLocalStorageItem = <K extends StorageKeyEnum>(
	storageKey: K,
	newData: StorageKeyTypeMap[K]
): void => {
	if (typeof window === "undefined") {
		return;
	}

	const existingData = getLocalStorageItem(storageKey) ?? [];

	const updatedData = [...existingData, ...newData];

	window.localStorage.setItem(storageKey, JSON.stringify(existingData));
};

export const getLocalStorageItem = <K extends StorageKeyEnum>(
	storageKey: K
): StorageKeyTypeMap[K] | null => {
	if (typeof window === "undefined") {
		return null;
	}

	const storageValueString = window.localStorage.getItem(storageKey);
	if (storageValueString) {
		try {
			const storageValue: StorageKeyTypeMap[K] =
				JSON.parse(storageValueString);
			return storageValue;
		} catch (error) {
			console.error(
				`Error parsing local storage value for key "${storageKey}":`,
				error
			);
		}
	}

	return null;
};

export const removeLocalStorageItem = (storageKey: StorageKeyEnum): void => {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.removeItem(storageKey);
};
