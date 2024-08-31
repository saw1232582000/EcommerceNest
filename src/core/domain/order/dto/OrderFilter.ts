import { BaseFilterSchema } from "src/core/common/schema/BaseFilterSchema";

export class OrderFilter extends BaseFilterSchema{
    date:string
    constructor(date:string,take:number,skip:number){
        super(take,skip)
        this.date=date || ""
    }
}