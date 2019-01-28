import { Request, Response } from 'express';
import { ContactController } from '../controllers/crmController';

export class Routes{
    public contactController: ContactController = new ContactController();

    public routes(app): void{
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'success'
            });
        });

        // Contact
        app.route('/contacts')
        // GET endpoint
        .get(this.contactController.getContacts)

        // POST endpoint
        .post(this.contactController.addNewContact);
    }
}