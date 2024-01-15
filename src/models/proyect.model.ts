import { Timestamp } from "firebase/firestore";

export interface Proyect
{
    id: string;
    title: string;
    img: string[];
    order: number;
    type: string;
    url: string;
    description: string;
    startDate: Timestamp;
    endDate: Timestamp;
}