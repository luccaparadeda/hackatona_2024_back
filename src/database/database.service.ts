import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.category.createMany({
      data: [
        {
          name: "chuvas_intensas",
          description:
            "Chuvas intensas são precipitações fortes e concentradas, que podem causar enchentes e deslizamentos, principalmente em áreas vulneráveis.",
          prompts: [
            "Como se preparar para uma enchente causada por chuvas intensas?",
            "O que fazer durante uma chuva intensa para garantir sua segurança?",
            "Como identificar áreas de risco de deslizamento em períodos de chuvas intensas?",
            "Quais são as ações imediatas em caso de enchente?",
          ],
        },
        {
          name: "incendio",
          description:
            "Incêndio é a queima descontrolada de materiais combustíveis, causando destruição e riscos à vida, ao meio ambiente e à propriedade.",
          prompts: [
            "Como evacuar uma área de forma segura durante um incêndio?",
            "Quais são as melhores práticas de segurança contra incêndios em casa?",
            "Como reconhecer sinais de perigo iminente de incêndio?",
            "O que fazer se você ficar preso em um edifício durante um incêndio?",
          ],
        },
      ],
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on("beforeExit", async () => {
      await app.close();
    });
  }
}
