import { Database } from '../Database/Database.js';

export abstract class AbstractModel {
    protected tableName: string;
    protected database: Database;
    protected id: number;

    constructor(tableName: string, id?: number) {
        this.tableName = tableName;
        this.database = Database.getInstance();
        this.id = id || 0;
    }


    /**
     * Implemente o metodo load para carregar os dados do modelo.
     *
     * @returns this
     */
    public async load(...args: any[]): Promise<this | null> {
        let query = `SELECT * FROM ${this.tableName} WHERE `;
        const queryParams: any[] = [];

        // Supondo que os argumentos passados são os critérios de busca
        if (args.length === 1) {
            query += 'id = ?';
            queryParams.push(args[0]);
        } else if (args.length === 2) {
            query += `${args[0]} = ?`;  // Pode ser outro critério como 'slug'
            queryParams.push(args[1]);
        }

        const result = await this.database.query(query, queryParams);

        if (result.length === 0) return null;
        return this.mapRowToModel(result[0]);
    }

    /**
     * Implemente o metodo save para salvar os dados do modelo.
     *
     * @returns self
     */
    public async save(): Promise<this> {
        if (this.id) {
            const query = `UPDATE ${this.tableName} SET ${this.getUpdateFields()} WHERE id = ?`;
            await this.database.query(query, this.getUpdateValues());
        } else {
            const query = `INSERT INTO ${this.tableName} (${this.getInsertFields()}) VALUES (${this.getInsertPlaceholders()})`;
            const result = await this.database.query(query, this.getInsertValues());
            this.id = result.insertId;
        }

        return this;
    }

    /**
    * Implemente o metodo delete para excluir os dados do modelo.
    *
    * @returns self
    */
    public async delete(): Promise<boolean> {
        const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await this.database.query(query, [this.id]);
        return result.affectedRows > 0;
    }


    public getTableName(): string {
        return this.tableName;
    }

    protected abstract getUpdateFields(): string;

    protected abstract getUpdateValues(): any[];

    protected abstract getInsertFields(): string;

    protected abstract getInsertValues(): any[];

    protected abstract getInsertPlaceholders(): string;

    protected abstract mapRowToModel(row: any): any;

}
