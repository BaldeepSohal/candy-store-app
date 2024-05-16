import jwt from 'jsonwebtoken';
import config from 'config';
import express, { Request, Response } from "express";

export default function auth(req: Request, res: Response, next: () => void)  {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send({'status': 'error', 'message': 'Access denied. No token provided.'});

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.body.user = decoded;
        next();
    }catch (ex){
        res.status(400).send('Invalid token.');
    }
    
}

