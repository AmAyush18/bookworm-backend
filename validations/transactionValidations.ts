import { body } from 'express-validator';

export const borrowBookValidation = [
  body('userId')
    .isInt()
    .withMessage('User ID must be an integer'),
  body('bookId')
    .isInt()
    .withMessage('Book ID must be an integer'),
];
