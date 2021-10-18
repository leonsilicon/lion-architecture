import { createMethodDefiner } from '../utils/methods';

export function coreModule<T>() {
	const defineMethods = createMethodDefiner<T>();

	return defineMethods({
		publicMethod() {
			if (this._options) {
				return this._options;
			} else {
				return this._coreState;
			}
		},
		_privateMethod() {
			return 'private';
		},
	});
}
