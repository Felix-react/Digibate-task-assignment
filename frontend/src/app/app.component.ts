import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  description: string = ''; // Blog description input
  length: string = 'medium'; // Selected blog length
  structure: string = 'list'; // Selected blog structure
  selectedFile: File | null = null; // Holds the uploaded file
  generatedPost: string = ''; // Generated blog post content
  errorMessage: string = ''; // Error message for user feedback

  // Updates selectedFile when a file is chosen
  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement; // Type assertion
    this.selectedFile = target.files ? target.files[0] : null; // Ensure file is selected
  }

  // Submits form data and handles blog post generation
  async onSubmit(): Promise<void> {
    if (!this.selectedFile) {
      console.error('No file selected');
      this.errorMessage = 'No file selected'; // Set error message
      return; // Exit if no file is selected
    }

    const formData = new FormData(); // Prepare form data
    formData.append('description', this.description);
    formData.append('length', this.length);
    formData.append('structure', this.structure);
    formData.append('file', this.selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/blog/generate', formData, {
        responseType: 'stream', // Handle streaming response
      });

      const reader = response.data.getReader(); // Get reader for the response stream
      const decoder = new TextDecoder('utf-8'); // Decode streamed data
      let generatedContent = '';

      while (true) {
        const { done, value } = await reader.read(); // Read stream data
        if (done) break; // Exit loop if done

        generatedContent += decoder.decode(value); // Accumulate content
        this.generatedPost = generatedContent; // Update displayed post
      }

      this.errorMessage = ''; // Clear error on success
    } catch (error) {
      console.error('Error generating blog post:', error);
      this.errorMessage = 'Error generating blog post. Please try again.'; // Set error message
    }
  }
}
