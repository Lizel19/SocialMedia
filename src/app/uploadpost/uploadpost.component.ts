import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { UserProfile } from '../models/user-profile';
import { NewsFeed } from '../models/newsfeed';
import { AuthService } from '../services/auth.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-uploadpost',
  templateUrl: './uploadpost.component.html',
  styleUrls: ['./uploadpost.component.css']
})
export class UploadpostComponent {
  public textArea: string = '';

  post: string = '';
  hasImage: boolean = false;
  ImageFile = [];
  postButton: boolean = true;
  user_id: number = 1;
  full_name?: string;
  email?: string;

  newsfeed: NewsFeed[] = [];
  UserToken: UserProfile[] = [];
 

  jwtHelper = new JwtHelperService();

  constructor(
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    var data = JSON.parse(localStorage.getItem('user')!);
    console.log(data);
    if (data != null) {
      this.user_id = data.id;
      this.full_name = data.full_name;
      this.email = data.email;
    }
  }

  SaveImage(event: any) {
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0];
      this.ImageFile = file
      console.log(this.ImageFile)
    }
  }


  createPost() {
    let postData: Post = {
      user_id: this.user_id,
      content: this.post,
      image: this.ImageFile,
      date_created: '',
    };
    var formData: any = new FormData();
    formData.append('user_id', this.user_id);
    formData.append('content', this.post);
    formData.append('image', this.ImageFile);
    formData.append('date_created', '');

    this.postService.UploadPost(formData).subscribe((data) => {
      console.log(data);
      this.post = '';
      this.postButton = true;
      this.hasImage = false;
      this.ImageFile = [];
    });
  }

  PostContent(e: any) {
    if (this.post === '') {
      this.postButton = true;
      console.log('no value');
    } else {
      this.postButton = false;
      console.log('has value');
    }
  }
}