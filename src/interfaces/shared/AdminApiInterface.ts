export interface AdminApiResponse{
    data: {
        data: string;
        statusCode: number;
        message: string;
        succeeded: boolean;
    };
    status: number;
    statusText: string;
}