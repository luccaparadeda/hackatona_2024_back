import { Controller, Get, Param } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("category")
@ApiTags("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: "Listar todas as categorias",
    description: "Recupera uma lista de todas as categorias disponíveis.",
  })
  @ApiResponse({
    status: 200,
    description: "Categorias recuperadas com sucesso.",
  })
  @ApiResponse({ status: 500, description: "Erro interno do servidor." })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Obter uma categoria",
    description: "Recupera uma categoria específica pelo ID fornecido.",
  })
  @ApiResponse({
    status: 200,
    description: "Categoria recuperada com sucesso.",
  })
  @ApiResponse({ status: 404, description: "Categoria não encontrada." })
  @ApiResponse({ status: 500, description: "Erro interno do servidor." })
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }
}
