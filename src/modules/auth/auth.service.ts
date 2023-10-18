import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {PrismaService} from "src/core/config/prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private jwtService: JwtService, private configService: ConfigService) {}
  async signup(createAuthDto: CreateAuthDto) {
    const { email, password, role, full_name,username, phone_number } = createAuthDto
    try {
      const existingUser = await this.prismaService.user.findUnique({
        where: {
          email: email
        },
      });

      if (existingUser) {
        return { error: true, message: "Cet email est déja utilisé", code: 404 };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.prismaService.user.create({
        data: {
          email: email,
          username: username,
          full_name: full_name,
          phone_number: phone_number,
          role: role,
          password_hash: hashedPassword
        }
      });

      return { error: false, message: "Utilisateur cré avec succès", code: 200, user: user };
    } catch (e) {
      return { message: "Une erreur s'est produite", error: e.message };
    }
  }

  async signin(loginDto: LoginDto) {
    const { email, phone_number, password } = loginDto
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          OR: [
            { email: email },
            { phone_number: phone_number },
          ],
        },
      });

      if (!user) {
        return { error: true, message: "Les informations de connexion sont incorrects", code: 404 };
      }
      const passwordMatch  = await bcrypt.compare(password, user.password_hash)

      if (passwordMatch) {
        const secret = this.configService.get<string>('JWT_SECRET_CODE');
        const token = this.jwtService.sign({ id: user.id }, { secret });
        delete user.password_hash;
        return {
          error: false,
          message: "your are login",
          token: token,
          user: user
        }
      } else {
        return { error: true, message: "Les informations de connexion sont incorrects", code: 404 };
      }
    } catch (e) {
      return { message: "Une erreur s'est produite", error: e.message };
    }
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
