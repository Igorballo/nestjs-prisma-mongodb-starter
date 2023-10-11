import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { AuthModule } from './auth/auth.module';
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
  imports: [PrismaModule, ProductsModule, SuppliersModule, AuthModule,
    JwtModule.register({
      secret: '2a$12$gltC0AassLwfjzd7KlEi1O.cTkbAOdUh/caZj9L/8qlZe0NEbemy.',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
