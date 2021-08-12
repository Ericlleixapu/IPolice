import {Event} from './Event';

export class CalendarDay {
    public day: Date;
    public events: Array<Event> = [];
    public selected:string = "";
    public style:string = "default";
    public eventsNum:number = 0;
    public turn;

    constructor(day:Date){
        this.day = day;
    }
}