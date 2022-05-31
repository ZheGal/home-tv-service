import { Module } from '@nestjs/common';
import { KstvController } from './kstv.controller';
import { KstvService } from './kstv.service';

@Module({
  controllers: [KstvController],
  providers: [KstvService]
})
export class KstvModule {}
