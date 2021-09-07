import { Turn } from "./Turn";

export class Event {

    public static typeEvent: string = "typeEvent";
    public static typeJuicio: string = "typeJuicio";
    public static typeExtra: string = "typeExtraTurn";
    public static typeFiesta: string = "typeFiesta";
    public static typeAP: string = "typeAP";
    public static typeVacaciones: string = "typeVacaciones";
    public static typeBaja: string = "typeBaja";

    public title: string = "";
    public description:string = "";
    public type:string = Event.typeEvent;
    public day:Date;
    public startTime: string = "08:00";
    public finalTime: string = "10:00";
    public allDay: boolean = false;
    public payed:boolean = false;
    public turn:Turn = null;

}