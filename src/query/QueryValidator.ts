import {EmptyValueError} from "../error/EmptyValueError";
import {IncorrectExpressionError} from "../error/IncorrectExpressionError";
import {BaseDao} from "../dao/BaseDao";

export class QueryValidator {
    /**
     * Verifies an orderBy expression according to the filter specification
     * (https://docs.ogc.org/is/18-088/18-088.html#orderby).
     *
     * @param expression orderBy expression to be checked
     * @param dao entity DAO used in the current query
     */
    checkOrderBy(expression: string, dao: BaseDao<any>) {
        if (expression.length === 0)
            throw new EmptyValueError('OrderBy argument must be a non-empty string.');

        if (expression.includes(' ')) {
            // removing useless spaces
            const clearedExpression = expression.replace(/\s+/g, ' ').trim();
            const args = clearedExpression.split(' ');
            const validSuffixes = ['asc', 'desc'];
            if (args.length > 2 || args.length < 2
                || !dao.entityPublicAttributes.includes(args[0])
                || !validSuffixes.includes(args[1]))
                throw new IncorrectExpressionError(`"${expression}" is not a valid OrderBy expression.`);
        } else if (!dao.entityPublicAttributes.includes(expression))
            throw new IncorrectExpressionError(`"${expression}" is not a valid OrderBy expression.`);

    }
}
