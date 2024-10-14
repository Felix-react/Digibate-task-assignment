import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import axios from 'axios';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule], // Include CommonModule here
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  description = '';
  length = 'medium';
  structure = 'list';
  selectedFile: File | null = null; 
  generatedPost: string = '';
  errorMessage: string = ''; // Add errorMessage property

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit() {
    if (!this.selectedFile) {
      console.error('No file selected');
      this.errorMessage = 'No file selected'; // Set error message
      return;
    }

    const formData = new FormData();
    formData.append('description', this.description);
    formData.append('length', this.length);
    formData.append('structure', this.structure);
    formData.append('file', this.selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/blog/generate', formData);
      this.generatedPost = response.data; // Assuming response.data contains the generated post
      this.errorMessage = ''; // Clear error message on successful response
    } catch (error) {
      console.error('Error generating blog post:', error);
      this.errorMessage = 'Error generating blog post. Please try again.'; // Set error message
    }
  }
}
