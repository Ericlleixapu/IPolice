import { Turn } from './Turn';

export class Cuadrante {

    public name: string;
    public turns: Array<Turn>;
    public startDay: Date;
    public length: number;
    public isActive:boolean;

    constructor(startDay, days, turns) {
        this.startDay = startDay;
        this.length = days;
        this.turns = turns;
    }
}