import { BaseDao } from '../../src/dao/BaseDao';
import { DumbEntity } from './DumbEntity';

/**
 * This is a dumb implementation of the BaseDao abstract class,
 * only used in tests.
 */
export class DumbEntityDao extends BaseDao<DumbEntity> {
    get entityPathname(): string {
        return 'DumbEntities';
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description'];
    }
    buildEntity(data: Record<string, unknown>): DumbEntity {
        return new DumbEntity(
            data.name as string,
            data.description as string,
            this._service
        );
    }
}
