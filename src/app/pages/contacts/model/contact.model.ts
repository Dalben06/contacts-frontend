import { BaseModel } from "src/app/core/models/base.model";

export class Contact implements BaseModel {
    uuId: string = ``;
    name: string = ``;
    number: string = ``;
    email: string = ``;
    formatNumber: string = ``;
    code: number= 0;
}