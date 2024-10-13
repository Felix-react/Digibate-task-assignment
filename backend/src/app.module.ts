import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [BlogModule],
})
export class AppModule {}
