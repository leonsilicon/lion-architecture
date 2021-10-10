import type { InternalTTInstance } from '../types/instance';

export function coreModule<T>() {
	function publicMethod(this: InternalTTInstance<T>) {
		return 1;
	}

	function _privateMethod(this: InternalTTInstance<T>) {
		return 'private';
	}

	return {
		publicMethod,
		_privateMethod,
	};
}
