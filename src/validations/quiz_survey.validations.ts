import Joi from 'joi';
import { constents } from '../configs/constents.config';
import { speeches } from '../configs/speeches.config';

export const quizSchema = Joi.object().keys({
    no_of_questions: Joi.string().required().messages({
        'string.empty': speeches.NAME_REQUIRED
    })
});

export const quizUpdateSchema = Joi.object().keys({
    status: Joi.string().valid(...Object.values(constents.common_status_flags.list)).required().messages({
        'any.only': speeches.COMMON_STATUS_INVALID,
        'string.empty': speeches.COMMON_STATUS_REQUIRED
    })
});

export const quizSubmitResponsesSchema = Joi.object().keys({
    responses: Joi.array().required().messages({
        'array.empty': speeches.SELCTED_OPTION_REQUIRED
    })
});