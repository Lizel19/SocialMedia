import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-uploadpost',
  templateUrl: './uploadpost.component.html',
  styleUrls: ['./uploadpost.component.css']
})
export class UploadpostComponent {
  title: string;
  cover: File;

  constructor(private http: HttpClient) {}

  onTitleChanged(event: any) {
    this.title = event.target.value;
  }

  onImageChanged(event: any) {
    this.cover = event.target.files[0];
  }

  newBook() {
    const uploadData = new FormData();
    uploadData.append('title', this.title);
    uploadData.append('cover', this.cover, this.cover.name);
    this.http.post('http://127.0.0.1:8000/outfit/', uploadData).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
}
