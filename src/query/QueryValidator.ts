import {EmptyValueError} from "../error/EmptyValueError";
import {IncorrectExpressionError} from "../error/IncorrectExpressionError";

export class QueryValidator {
    /**
     * Verifies an orderBy expression according to the filter specification
     * (https://docs.ogc.org/is/18-088/18-088.html#orderby).
     *
     * @param expression orderBy expression to be checked
     * @param entityProperties entity properties names
     */
    checkOrderBy(expression: string, entityProperties: string[]): void {
        if (expression.length === 0)
            throw new EmptyValueError('OrderBy argument must be a non-empty string.');

        if (expression.includes(' ')) {
            // removing useless spaces
            const clearedExpression = expression.replace(/\s+/g, ' ').trim();
            const args = clearedExpression.split(' ');
            const validSuffixes = ['asc', 'desc'];
            if (args.length > 2 || args.length < 2
                || !entityProperties.includes(args[0])
                || !validSuffixes.includes(args[1]))
                throw new IncorrectExpressionError(`"${expression}" is not a valid OrderBy expression.`);
        } else if (!entityProperties.includes(expression))
            throw new IncorrectExpressionError(`"${expression}" is not a valid OrderBy expression.`);

    }

    /**
     * Verifies a select expression according to the filter specification
     * (https://docs.ogc.org/is/18-088/18-088.html#select4).
     *
     * @param attributes select attributes to be checked
     * @param entityProperties entity properties names
     */
    checkSelect(attributes: string[], entityProperties: string[]): void {
        for (const attribute of attributes)
            if (!entityProperties.includes(attribute))
                throw new IncorrectExpressionError(`"${attribute}" is not a valid $select expression.`);
    }
}
