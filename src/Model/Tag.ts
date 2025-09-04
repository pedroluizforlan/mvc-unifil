import { AbstractModel } from "./AbstractModel.js";

export class Tag extends AbstractModel {
    public nome: string;

    constructor(nome: string, id?: number) {
        super('tags', id);
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

    protected mapRowToModel(row: any): Tag {
        return new Tag(row.nome, row.id);
    }
}
