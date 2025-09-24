export class AppError extends Error {
    status: number;
    messageFront: string;

    constructor(
        status: number,
        message: string,
        messageFront: string,
        options?: { cause?: Error }
    ) {
        super(message, options);
        this.status = status;
        this.messageFront = messageFront;
        this.name = this.constructor.name;
    }
}