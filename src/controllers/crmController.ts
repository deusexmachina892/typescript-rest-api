import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Contact } from '../models/Contact';

export class ContactController{
    public async addNewContact ( req: Request, res: Response) {
      let newContact = new Contact(req.body);
      newContact = await newContact.save();
      res.status(200).send({contact: newContact, success: true});
  }

    public async getContacts (req: Request, res: Response){
        const contacts = await Contact.find({});
        res.status(200).send({ contacts, success: true});
    }

    public async getContact (req: Request, res: Response) {
        const contact = await Contact.findById(req.params.id);
        res.status(200).send({ contact, success: true })
    }
}