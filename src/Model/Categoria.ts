import { AbstractModel } from "./AbstractModel.js";

export class Categoria extends AbstractModel {
    public nome: string;

    constructor(nome: string, id?: number) {
        super('categorias', id);
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

    protected mapRowToModel(row: any): Categoria {
        return new Categoria(row.nome, row.id);
    }
}
