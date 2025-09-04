import { AbstractController } from './AbstractController.js'; 
import { Categoria } from '../Model/Categoria.js'; 

export class CategoriaController extends AbstractController {

    public async execute(): Promise<void> {
        const method = this.getMethod();

        if (method === 'POST') {
            await this.createCategoria();
        } else if (method === 'GET') {
            await this.getCategoria();
        } else {
            this.sendResponse(405, 'Método não permitido');
        }
    }


    private async createCategoria(): Promise<void> {
        const { nome } = this.getParams();
        
        try {
            const categoria = new Categoria(nome);
            await categoria.save();
            this.sendResponse(201, 'Categoria criada com sucesso', categoria);
        } catch (error) {
            this.sendResponse(500, 'Erro ao criar categoria', error.message);
        }
    }


    private async getCategoria(): Promise<void> {
        const { id } = this.getParams();

        try {
            const categoria = await new Categoria('', id).load(id);
            if (categoria) {
                this.sendResponse(200, 'Categoria encontrada', categoria);
            } else {
                this.sendResponse(404, 'Categoria não encontrada');
            }
        } catch (error) {
            this.sendResponse(500, 'Erro ao recuperar categoria', error.message);
        }
    }
}
