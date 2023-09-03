import { ErrorRequestHandler } from 'express';
import { FLASH_ACTION_ERROR, FLASH_TEXT_ERROR } from '../defs/flash.def';
import { Config } from '../env.config';

export const ErrorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
    if (Config.nodeEnv !== 'production') {
        console.log(err.stack);
    }

    req.flash(FLASH_ACTION_ERROR, FLASH_TEXT_ERROR);
    if (req.session) {
        return req.session.save(() => res.redirect('/index'));
    }
    res.redirect('/index');
}