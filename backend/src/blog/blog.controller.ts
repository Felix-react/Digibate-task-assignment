import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { OpenaiService } from '../openai/openai.service'; // Adjust the path as necessary
import { Readable } from 'stream';

@Controller('blog')
export class BlogController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('generate')
  async generateBlog(@Body() data: any, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.flushHeaders(); // Flush headers to initiate streaming response

    // Stream the response from OpenAI
    this.openaiService.generateBlog(data, (chunk: string) => {
      res.write(`data: ${chunk}\n\n`);
    });
  }
}
