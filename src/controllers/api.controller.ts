import { Request, Response } from 'express';
import Acronym from '../models/acronym';
import acronym, { AcronymDocument } from '../models/acronym';

export const create = async (req: Request, res: Response) => {
  const { body } = req;
  const { name, description } = body;

  const acronym = new Acronym({
    name,
    description
  });

  try {
    await acronym.save();
  } catch(err) {
    throw new Error('');
  }

  return res.status(200).send({ data: acronym });
}

export const get = async (req: Request, res: Response) => {
  const { id } = req.params;
  let acronym: AcronymDocument; 

  try {
    acronym = await Acronym.findById(id);
  } catch(err) {
    throw new Error('');
  }

  return res.status(200).send({ data: acronym });
}

export const getAll = async (req: Request, res: Response) => {
  let data: AcronymDocument[];

  try {
    data = Acronym.find({});
  } catch(err) {
    throw new Error('');
  }

  return res.status(200).send({ data: data })
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
