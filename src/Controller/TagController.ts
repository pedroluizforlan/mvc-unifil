
import { AbstractController } from './AbstractController.js'; 
import { Tag } from '../Model/Tag.js'; 

export class TagController extends AbstractController {

    public async execute(): Promise<void> {
        const method = this.getMethod();

        if (method === 'POST') {
            await this.createTag();
        } else if (method === 'GET') {
            await this.getTag();
        } else {
            this.sendResponse(405, 'Método não permitido');
        }
    }


    private async createTag(): Promise<void> {
        const { nome } = this.getParams();
        

        try {
            const tag = new Tag(nome);
            await tag.save();
            this.sendResponse(201, 'Tag criada com sucesso', tag);
        } catch (error) {
            this.sendResponse(500, 'Erro ao criar tag', error.message);
        }
    }

    private async getTag(): Promise<void> {
        const { id } = this.getParams();

        try {
            const tag = await new Tag('', id).load(id);
            if (tag) {
                this.sendResponse(200, 'Tag encontrada', tag);
            } else {
                this.sendResponse(404, 'Tag não encontrada');
            }
        } catch (error) {
            this.sendResponse(500, 'Erro ao recuperar tag', error.message);
        }
    }
}
