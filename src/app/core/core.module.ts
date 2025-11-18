import { NgModule } from '@angular/core';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@NgModule({
  imports: [InfrastructureModule],
  exports: [InfrastructureModule]
})
export class CoreModule {}