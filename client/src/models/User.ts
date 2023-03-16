export type User = {
    username: string;
    email: string;
    password?: string;
    subs?: Array<string>;
}