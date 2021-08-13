export class Turn {

    public title: string;
    public days: number;
    public color: string;
    public startTime: string;
    public finalTime: string;
    public description:string;

    constructor(title?:string,days?:number,color?:string){

        if(title){this.title = title;}
        if(days){this.days = days;}
        if(color){this.color = color;}
        
    }

}