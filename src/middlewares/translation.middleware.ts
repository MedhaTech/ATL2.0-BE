// It will monkey patch the res.send.
// The patch intercepts the send invocation, executes is logic such as atatus.setResponseBody

import { NextFunction, Request,RequestHandler,Response } from "express";
import { constents } from "../configs/constents.config";
import TranslationService from "../services/translation.service";
import CryptoJS from 'crypto-js';

// then restores the original send function and invokes that to finalize the req/res chain
export const resSendInterceptor = (res:Response, send:any) => (content:any) => {

    // Set response body in Atatus Analytics
    // Atatus is our API analytics tool
    

    // TODO: You can modify your response body as you wish.

    // Invoke the original send function.
    res.send = send;
    send.apply(this, "arguments");

};

export const translationMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    var locale:any;
    var value:any = req.query.Data;
    let newREQQuery : any = {}
    if(req.query.Data){
        const apikey = 'PMBXDE9N53V89K65';
        const decoded = atob(value);
        const newQuery = CryptoJS.AES.decrypt(decoded, apikey).toString(CryptoJS.enc.Utf8);
        newREQQuery  = JSON.parse(newQuery);
        locale = newREQQuery.locale;
    }
    else{
        locale = 'en';
    }
    const trasnlationService = new TranslationService()
    if(!locale || !trasnlationService.getSupportedLocales().includes(locale)){
        locale  = constents.translations_flags.default_locale
    }
    
    trasnlationService.setCurrentLocale(locale);
    
    res.locals.translationService = trasnlationService;
    next()
}