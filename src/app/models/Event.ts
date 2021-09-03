import { Turn } from "./Turn";

export class Event {

    public title: string = "";
    public description:string = "";
    public type:string = "event";
    public day:Date;
    public startTime: string = "08:00";
    public finalTime: string = "10:00";
    public allDay: boolean = false;
    public payed:boolean = false;
    public turn:Turn = null;

}