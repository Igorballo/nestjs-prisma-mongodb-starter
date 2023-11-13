import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService} from "src/core/config/prisma/prisma.service";

@Injectable()
export class SuppliersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createSupplierDto: CreateSupplierDto) {
    return this.prismaService.supplier.create({
      data: createSupplierDto,
    });
  }

  findAll() {
    return this.prismaService.supplier.findMany({
      include: {
        products: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
