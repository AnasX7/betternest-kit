import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { Implement, implement } from '@orpc/nest';
import { contract } from '@repo/api';

@AllowAnonymous()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Implement(contract.hello.get)
  get() {
    return implement(contract.hello.get).handler(() => {
      const message = this.appService.getHello();
      return { message };
    });
  }
}
