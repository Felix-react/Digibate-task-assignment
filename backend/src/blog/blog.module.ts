import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { OpenaiService } from '../openai/openai.service';

/**
 * Module for blog-related features, including the controller for handling requests
 * and the service for generating blog content using OpenAI.
 */
@Module({
  controllers: [BlogController], // Handles blog requests
  providers: [OpenaiService], // Service for OpenAI API interaction
})
export class BlogModule {}
