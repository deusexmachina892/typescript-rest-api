import { Request, Response } from 'express';
import { NextFunction } from "connect";
import { KEY } from '../config/key';

export function requireKey(req: Request, res: Response, next: NextFunction): Response{
    if(req.query.key !== KEY){
        return res.status(401).send('You shall not pass!');
    }
    next();
}