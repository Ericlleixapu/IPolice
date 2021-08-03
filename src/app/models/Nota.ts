export class Nota{

    public id:number;
    public titulo:string;
    public text:string;
    public fecha:Date;
    public type:string;
    public pagado:boolean;

    constructor(){
        this.titulo = "";
        this.text = "";
        this.fecha = null;
        this.type = "nota";
        this.pagado = false;
    }

}