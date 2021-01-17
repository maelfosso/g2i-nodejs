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
  const existingAcronym: AcronymDocument = Acronym.findOne({ code });
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
    const pageNumber = parseInt(from as string);
    const max = parseInt(limit as string);

    data = await Acronym
      .find(options)
      .skip(pageNumber > 0 ? pageNumber : 0 )
      .limit(max ? max : -1);

  } catch(err) {
    throw new DatabaseError(`Error occured when retreiving acronyms(${from} - ${limit} - ${search})`, err.message)
  }

  return res.status(200).send({ data: data })
}

export const update = async (req: Request, res: Response) => {
  const { body } = req;
  const { code, description } = body;

  // Check if this code already exists
  const acronym: AcronymDocument = Acronym.findOne({ code });
  if (!acronym) {
    throw new BadRequestError(`Code nod exist. An acronym with this code (${code}) does not exist. Update is not possible`);
  }

  // Replace document with new values
  try {
    await Acronym.replaceOne({ _id: acronym._id }, { code: code, description: description });

  } catch(err) {
    throw new DatabaseError(`Error when updating acronym(${code}, ${description})`, err.message);
  }

  return res.status(201).send({ data: acronym });
}

export const remove = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    await Acronym.remove({ code });
  } catch(err) {
    throw new DatabaseError(`Error occured when deleting acronym(${code})`, err.message);
  }

  return res.status(200).send({ success: true });
}

export const random = async (req: Request, res: Response) => {
  let { count } = req.params;
  let data: AcronymDocument[] = [];
  let size: number;

  try {
    if (!count) {
      size = Math.floor(Math.random() * 100)
    } else {
      size = parseInt(count);
    }

    data = await Acronym.aggregate([ { $sample: { size: size } }]);
  } catch(err) {
    throw new DatabaseError(`Error occured when randomly fetching acronyms data`, err.message)
  }

  return res.status(200).send({ data: data });
}
