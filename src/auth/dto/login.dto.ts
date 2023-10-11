import {IsEmail, IsNotEmpty, IsOptional, IsString, Length,} from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(4, 20, { message: 'Password has to be at between 4 and 20 characters'})
    password: string

    @IsOptional()
    @IsString()
    phone_number: string
}
