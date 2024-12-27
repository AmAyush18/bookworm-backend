import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors: { [key: string]: string[] } = {};

    errors
      .array()
      .forEach((error: ValidationError) => {
        if ('loc' in error) {
          const { loc, msg } = error as { loc: string[]; msg: string }; 
          const key = loc.join('.'); 
          if (!extractedErrors[key]) {
            extractedErrors[key] = [];
          }
          extractedErrors[key].push(msg);
        } else {
          console.error('Unexpected error format:', error); 
        }
      });

    res.status(400).json({
      success: false,
      errors: extractedErrors,
    });
    return;
  }

  next();
};