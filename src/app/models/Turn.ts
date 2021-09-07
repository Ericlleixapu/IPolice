export class Turn {

    public title: string = "";
    public days: number;
    public color: string = "Sin Color";
    public startTime: string = "00:00";
    public finalTime: string = "00:00";
    public description:string = "";
    public isHidden:boolean = false;

    constructor(turn?:Turn,days?:number){

        if(turn){
            this.title = turn.title;
            this.days = days;
            this.color = turn.color;
            this.startTime = turn.startTime;
            this.finalTime = turn.finalTime;
            this.description = turn.description;
        }
    }
}