import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import escapeStringRegExp from 'escape-string-regexp';
import debugLib from 'debug';
import Acronym from '../models/acronym';
import acronym, { AcronymDocument } from '../models/acronym';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request';
import { DatabaseError } from '../errors/database-error';

const debug = debugLib('g2i:api-controller');

export const create = async (req: Request, res: Response) => {
  // extract possible errors from express-validator (api.routes.ts#10-17)
  // If there are some errors, throw them
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { body } = req;
  const { code, description } = body;

  // Check if this code already exists
  const existingAcronym = Acronym.findOne({ code });
  if (existingAcronym) {
    throw new BadRequestError(`Code already exist. An acronym with this code (${code}) already exist.`);
  }

  // Save the acronym
  const acronym = Acronym.build({
    code,
    description
  });

  try {
    await acronym.save();
  } catch(err) {
    throw new DatabaseError(`Error when saving acronym(${code}, ${description})`, err.message);
  }

  return res.status(201).send({ data: acronym });
}

export const get = async (req: Request, res: Response) => {
  const { code } = req.params;

  debug(`Get : ${code} .`);
  
  let acronym: AcronymDocument; 

  try {
    acronym = await Acronym.findOne({ code });
  } catch(err) {
    throw new DatabaseError(`Error occured when retreiving acronym(${code})`, err.message);
  }

  return res.status(200).send({ data: acronym });
}

export const getAll = async (req: Request, res: Response) => {
  const { from, limit, search } = req.query;
  let data: AcronymDocument[];

  debug(`Get ALL ${from} - ${limit} - ${search}`);

  let options = {};
  if (search) {
    const regex = new RegExp(escapeStringRegExp(search as string));

    options = { 
      $or: [
        { code: { $regex: regex, $options: 'xsim' }} ,
        { description: { $regex: regex, $options: 'xsim' }} 
      ] 
    }
  }
  try {
    data = await Acronym.find(options).limit(limit ? limit : -1);
  } catch(err) {
    throw new Error('');
  }

  return res.status(200).send({ data: data })
}

export const update = async (req: Request, res: Response) => {
  
}

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Acronym.remove({ _id: id });
  } catch(err) {
    throw new Error('');
  }

  return res.status(200).send({ success: true });
}
