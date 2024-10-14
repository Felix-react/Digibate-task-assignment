import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

/**
 * Service for generating blog posts using the OpenAI API.
 */
@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  /**
   * Initializes the OpenAI service with the API key.
   */
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Get API key from environment variables
    });
  }

  /**
   * Generates a blog post and streams the response.
   * @param data - Data for the blog post including description, structure, length, and company details.
   * @param callback - Function to handle each streamed chunk of content.
   */
  async generateBlog(data: any, callback: (chunk: string) => void): Promise<void> {
    const { description, structure, length, companyDetails } = data;

    const prompt = `Generate a ${structure} blog post about ${description}. It should be ${length} words long. Here are the company details: ${JSON.stringify(companyDetails)}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // OpenAI model to use
      messages: [{ role: 'user', content: prompt }], // User prompt
      max_tokens: 500, // Max tokens for the response
      stream: true, // Enable streaming
    });

    // Stream response chunks in real-time
    for await (const chunk of response) {
      callback(chunk.choices[0].delta.content); // Send each chunk to the callback
    }
  }
}
