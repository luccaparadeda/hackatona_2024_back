import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/database.service";

@Injectable()
export class CategoryService {
  constructor(private readonly database: PrismaService) {}
  findAll() {
    return this.database.category.findMany();
  }

  findOne(id: number) {
    return this.database.category.findUnique({
      where: { id },
    });
  }
}
