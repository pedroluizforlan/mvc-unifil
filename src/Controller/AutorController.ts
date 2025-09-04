import { AbstractController } from './AbstractController.js'; 
import { Autor } from '../Model/Autor.js'; 

export class AutorController extends AbstractController {

    public async execute(): Promise<void> {
        const method = this.getMethod();

        if (method === 'POST') {
            await this.createAutor();
        } else if (method === 'GET') {
            await this.getAutor();
        } else {
            this.sendResponse(405, 'Método não permitido');
        }
    }

    private async createAutor(): Promise<void> {
        const { nome } = this.getParams();
        
        try {
            const autor = new Autor(nome);
            await autor.save();
            this.sendResponse(201, 'Autor criado com sucesso', autor);
        } catch (error) {
            this.sendResponse(500, 'Erro ao criar autor', error.message);
        }
    }

    private async getAutor(): Promise<void> {
        const { id } = this.getParams();
        
        try {
            const autor = await new Autor('', id).load(id);
            if (autor) {
                this.sendResponse(200, 'Autor encontrado', autor);
            } else {
                this.sendResponse(404, 'Autor não encontrado');
            }
        } catch (error) {
            this.sendResponse(500, 'Erro ao recuperar autor', error.message);
        }
    }
}
