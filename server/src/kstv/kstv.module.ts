import { Module } from '@nestjs/common';
import { SettingModule } from 'src/setting/setting.module';
import { KstvController } from './kstv.controller';
import { KstvService } from './kstv.service';

@Module({
  imports: [SettingModule],
  controllers: [KstvController],
  providers: [KstvService]
})
export class KstvModule {}
