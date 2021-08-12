import { Turn } from './Turn';

export class Cuadrante {

    public name: string;
    public turns: Array<Turn>;
    public startDay: Date;
    public length: number;

    constructor(initialDate, days, turns) {
        this.startDay = initialDate;
        this.length = days;
        this.turns = turns;
    }
}