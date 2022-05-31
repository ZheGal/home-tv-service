import { Module } from '@nestjs/common';
import { YoutubeModule } from './youtube/youtube.module';
import { KstvModule } from './kstv/kstv.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    YoutubeModule, KstvModule,
  ],
})
export class AppModule {}
