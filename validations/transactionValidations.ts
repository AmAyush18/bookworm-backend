import { body } from 'express-validator';

export const borrowBookValidation = [
  body('bookId')
    .isInt()
    .withMessage('Book ID must be an integer'),
];

export const returnBookValidation = [
  body('bookId')
    .isInt()
    .withMessage('Book ID must be an integer'),
];
