import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/core/config/prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { AuthModule } from './auth/auth.module';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [PrismaModule, ProductsModule, SuppliersModule, AuthModule,
    JwtModule.register({
      global: true,
      secret: '2a$12$gltC0AassLwfjzd7KlEi1O.cTkbAOdUh/caZj9L/8qlZe0NEbemy.',
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
