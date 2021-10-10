import type { InternalTypescriptTemplateInstance } from '../types/instance';

export function coreModule<T>() {
	function publicMethod(this: InternalTypescriptTemplateInstance<T>) {
		return 1;
	}

	function _privateMethod(this: InternalTypescriptTemplateInstance<T>) {
		return 'private';
	}

	return {
		publicMethod,
		_privateMethod,
	};
}
