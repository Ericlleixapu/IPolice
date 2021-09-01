import {Event} from './Event';
import { Turn } from './Turn';

export class CalendarDay {
    public day: Date;
    public events: Array<Event> = [];
    public selected:string = "";
    public style:string = "default";
    public eventsNum:number = 0;
    public turnColor="";
    public turn:Turn = new Turn();

    constructor(day:Date){
        this.day = day;
    }
}