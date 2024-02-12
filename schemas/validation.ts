import { CustomValidator, Slug } from 'sanity';

const containWhitespace = {
  message: 'Slug cannot contain whitespace',
  validate: (value: string) => /\s/.test(value),
};
const containSpecialCharacters = {
  message: 'Slug cannot contain special characters',
  validate: (value: string) => /[^a-z0-9-]/.test(value),
};
const containConsecutiveDashes = {
  message: 'Slug cannot contain consecutive dashes',
  validate: (value: string) => /--/.test(value),
};
const startWithDash = {
  message: 'Slug cannot start with a dash',
  validate: (value: string) => /^-/.test(value),
};
const endWithDash = {
  message: 'Slug cannot end with a dash',
  validate: (value: string) => /-$/.test(value),
};
const containUpperCase = {
  message: 'Slug cannot contain uppercase characters',
  validate: (value: string) => /[A-Z]/.test(value),
};

export const slugValidation: CustomValidator<Slug> = (slug) => {
  if (!slug) return true;

  const slugValidations = [
    containWhitespace,
    containSpecialCharacters,
    containConsecutiveDashes,
    startWithDash,
    endWithDash,
    containUpperCase,
  ];

  return (
    slugValidations
      .map((validation) => {
        if (validation.validate(slug.current)) {
          return validation.message;
        }

        return true;
      })
      .filter((result) => result !== true)
      .join('. ') || true
  );
};
