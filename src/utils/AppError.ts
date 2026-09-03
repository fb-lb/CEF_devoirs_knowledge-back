import { ModelList, NewLog } from "../types/types.js";

export class AppError extends Error {
    status: number;
    messageFront: string;
    dbErrorContext?: Extract< NewLog, { event: 'DATABASE_ERROR' } >['metadata'];

    constructor(
        status: number,
        message: string,
        messageFront: string,
        options?: { cause?: Error; dbErrorContext?: AppError['dbErrorContext'] }
    ) {
        super(message, options);
        this.status = status;
        this.messageFront = messageFront;
        this.name = this.constructor.name;
        if (options?.dbErrorContext) this.dbErrorContext = options?.dbErrorContext;
    }
}

export function extractDbErrorCode(error: unknown): string {
    return (error as any)?.parent?.code ?? (error as any)?.name ?? 'UNKNOWN';
}

export function throwDbError(status: number, message: string, messageFront: string, error: any, model: ModelList, operation: string): never {
    throw new AppError(
        status,
        message,
        messageFront,
        {
            cause: error,
            dbErrorContext: {
                model,
                operation,
                errorCode: extractDbErrorCode(error)
            }
        }
    );
}