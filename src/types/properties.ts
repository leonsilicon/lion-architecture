import type { UnionToIntersection } from 'utility-types';

import * as typescriptTemplateModules from '../modules';

class ModulesWrapper<T> {
	// eslint-disable-next-line class-methods-use-this
	wrapped() {
		return typescriptTemplateModules['' as keyof typeof typescriptTemplateModules]<T>();
	}
}

export type InternalTypescriptTemplateProperties<T> = UnionToIntersection<
	ReturnType<ModulesWrapper<T>['wrapped']>
>;
