import { IsEmail, IsNotEmpty, IsString, MinLength, registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';


function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return typeof value === 'string' && passwordRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must contain at least one letter, one number, and one special character, and must be at least 8 characters long.';
        },
      },
    });
  };
}

export class CreateSignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsPasswordValid({ message: 'Password must include at least 1 letter, 1 number, and 1 special character.' })
  readonly password: string;
}