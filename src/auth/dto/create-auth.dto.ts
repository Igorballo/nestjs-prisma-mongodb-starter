import {IsEmail, IsIn, IsMobilePhone, IsNotEmpty, IsString, Length, Min} from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    full_name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(4, 20, { message: 'Password has to be at between 4 and 20 characters'})
    password: string

    @IsNotEmpty()
    @IsString()
    @IsIn(['admin', 'member'])
    role: string

    @IsString()
    phone_number: string
}
