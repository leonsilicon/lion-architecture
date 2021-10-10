import type { UnionToIntersection } from 'utility-types';

import * as ttModules from '../modules';

class ModulesWrapper<T> {
	// eslint-disable-next-line class-methods-use-this
	wrapped() {
		return ttModules['' as keyof typeof ttModules]<T>();
	}
}

export type InternalTTMethods<T> = UnionToIntersection<
	ReturnType<ModulesWrapper<T>['wrapped']>
>;
