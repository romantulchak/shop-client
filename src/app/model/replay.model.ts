import { User } from './user.model';

export class Replay{
    id: number;
    message: string;
    user: User;
    dateTime: Date;
}