import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {PrismaService} from "src/prisma/prisma.service";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {
  }
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
