import { HttpException, HttpStatus } from "@nestjs/common";

export const isProd = (env: string) => env === 'PRODUCTION';
export const handleError = (error: unknown, message?: string): HttpException => {
    if (error instanceof HttpException) {
        throw error;
    }

    let errorMsg = message ?? 'Unexpected error occurred';
    throw new HttpException(errorMsg, HttpStatus.INTERNAL_SERVER_ERROR);
}