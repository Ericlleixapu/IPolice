export class Turn {

    public title: string;
    public days: number;
    public color: string;
    public startTime: string;
    public finalTime: string;
    public description:string;

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