import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {PrismaService} from "src/shared/prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.prismaService.product.create({
        data: createProductDto
      });

      return { error : false, message: "Ajout réussi", code: 200, product: product}
    } catch (error) {
      return { message: "Une erreur s'est produite", error: error.message };
    }
  }

  async findAll() {
    try {
      const products = await this.prismaService.product.findMany(
          {
            include: {
              supplier: true
            }
          }
      );
      return { error : false, code: 200, products: products}
    } catch (error) {
      return { message: "Une erreur s'est produite", error: error.message };
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prismaService.product.findUnique({
        where: {
          id
        },
      });

      if (!product) {
        return { error: true, message: "Produit introuvable", code: 404 };
      }

      return { error: false, message: "Produit retrouvé", code: 200, product: product };
    } catch (e) {
      return { message: "Une erreur s'est produite", error: e.message };
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { name, description, price, supplierId } = updateProductDto
    try {
      const existingProduct = await this.prismaService.product.findUnique({
        where: {
          id
        },
      });

      if (!existingProduct) {
        return { error: true, message: "Produit introuvable", code: 404 };
      }

      const product = await this.prismaService.product.update({
        where: {
          id
        },
        data: updateProductDto
      });

      return { error: false, message: "Mise à jour réussie", code: 200, product: product };
    } catch (e) {
      return { message: "Une erreur s'est produite", error: e.message };
    }
  }

  async remove(id: string) {
    try {
      const existingProduct = await this.prismaService.product.findUnique({
        where: {
          id
        },
      });

      console.log(existingProduct)

      if (!existingProduct) {
        return { error: true, message: "Produit introuvable", code: 404 };
      }

      await this.prismaService.product.delete({
        where: {
          id
        },
      });

      return { error: false, message: "Suppression réussie", code: 200 };
    } catch (e) {
      return { message: "Une erreur s'est produite", error: e.message };
    }
  }
}
