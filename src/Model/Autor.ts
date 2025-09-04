import { AbstractModel } from "./AbstractModel.js";

export class Autor extends AbstractModel {
    public nome: string;

    constructor(nome: string, id?: number) {
        super('autores', id);
        this.nome = nome;
    }

    protected getUpdateFields(): string {
        return 'nome = ?';
    }

    protected getUpdateValues(): any[] {
        return [this.nome];
    }

    protected getInsertFields(): string {
        return 'nome';
    }

    protected getInsertValues(): any[] {
        return [this.nome];
    }

    protected getInsertPlaceholders(): string {
        return '?';
    }

    protected mapRowToModel(row: any): Autor {
        return new Autor(row.nome, row.id);
    }
}
