import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      name: 'Fleet Management API',
      status: 'running',
      docs: 'Leia README.md',
      apiDocs: 'Consultar documentação em /api',
      version: '1.0.0',
    };
  }
}
