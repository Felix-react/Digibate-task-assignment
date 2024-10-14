import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { OpenaiService } from '../openai/openai.service'; // Adjust the path as necessary
import { Readable } from 'stream';

/**
 * Controller for handling blog-related requests.
 */
@Controller('blog')
export class BlogController {
  constructor(private readonly openaiService: OpenaiService) {}

  /**
   * Endpoint to generate a blog post.
   * @param data - Data containing blog details.
   * @param res - Express response object for streaming the response.
   */
  @Post('generate')
  async generateBlog(@Body() data: any, @Res() res: Response) {
    // Set headers for server-sent events (SSE)
    res.setHeader('Content-Type', 'text/event-stream'); // Specify content type for streaming
    res.setHeader('Cache-Control', 'no-cache'); // Prevent caching
    res.setHeader('Connection', 'keep-alive'); // Keep the connection open

    res.flushHeaders(); // Flush headers to initiate streaming response

    // Stream the response from OpenAI
    this.openaiService.generateBlog(data, (chunk: string) => {
      res.write(`data: ${chunk}\n\n`); // Write each chunk of data to the response
    });
  }
}
