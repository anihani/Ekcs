import { Component } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ekcs-task-anil';
  commentsArray: any = [];
  showComments: boolean = false;
  showForm: boolean = false;

  comments = [
    {
      "id": 1,
      "commentorName": "Commentor 1",
      "prflPic": "../assets/prfl-pics/your-photo.jpg",
      "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",

      "subcomments": [
        {
          "id": 1,
          "commentorName": "SubCommentor 1",
          "prflPic": "../assets/prfl-pics/your-photo.jpg",
          "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
          "isCommentYours": false,

        },

      ]
    },
    {
      "id": 2,
      "commentorName": "Commentor 2",
      "gender": "male",
      "prflPic": "../assets/prfl-pics/your-photo.jpg",
      "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      "subcomments": [
        {
          "id": 1,
          "commentorName": "Jack",
          "prflPic": "../assets/prfl-pics/your-photo.jpg",
          "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
          "isCommentYours": false,
        },

      ]
    },
    {
      "id": 3,
      "commentorName": "Commentor 3",
      "prflPic": "../assets/prfl-pics/your-photo.jpg",
      "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      "isCommentYours": false,
    },
    {
      "id": 4,
      "commentorName": "Commentor 4",
      "prflPic": "../assets/prfl-pics/your-photo.jpg",
      "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      "isCommentYours": false,

    },

  ]
  commentForm = new FormGroup({
    usercomment: new FormControl(''),

  });
  editcommentForm = new FormGroup({
    usercomment: new FormControl(''),

  });
  ngOnInit() {
    localStorage.setItem('commentsList', JSON.stringify(this.comments))
  
      // localStorage.setItem('commentsList', JSON.stringify(this.comments));
      this.commentsArray = JSON.parse(localStorage.getItem('commentsList') || '{}');
      console.log(this.commentsArray)
      // this.commentsArray = JSON.parse(JSON.stringify(this.comments));
      this.commentsArray.forEach((element: any) => {
        element.isToDisplay = false;
        element.isFormDisplay = false;
      });
    
  }
  showSubcomments(index: any) {

    this.commentsArray[index].isToDisplay = !this.commentsArray[index].isToDisplay;
    this.commentsArray[index].subcomments.forEach((element: any) => {
      element.isEditable = false;
    });
  }
  openreplayform(index: any) {
    this.commentsArray[index].isFormDisplay = !this.commentsArray[index].isFormDisplay;
  }
  onSubmit(index: any) {

    // TODO: Use EventEmitter with form value
    console.log(this.commentsArray[index].subcomments)
    this.commentsArray[index].subcomments.push({
      "id": 5,
      "commentorName": "Test Commentor",

      "message": this.commentForm.value.usercomment,
      "isCommentYours": true,
    });
    this.commentForm.reset();
    this.commentsArray[index].isFormDisplay = !this.commentsArray[index].isFormDisplay;
    console.log("subcomments", this.commentsArray[index].subcomments);
    console.log("main array", this.commentsArray);
    localStorage.setItem('commentsList', JSON.stringify(this.commentsArray));
  }
  editdata(parentindex: any, childIndex: any) {
    this.commentsArray[parentindex].subcomments.forEach((element: any) => {
      element.isEditable = false;
    });
    this.commentsArray[parentindex].subcomments[childIndex].isEditable = !this.commentsArray[parentindex].subcomments[childIndex].isEditable;
  }
  deleteComments(parentIndex: any, childIndex: any) {
    console.log(parentIndex, childIndex)
    if (confirm("Are you sure to delete ")) {
      console.log("Implement delete functionality here");
      this.commentsArray[parentIndex].subcomments.splice(childIndex);
      localStorage.setItem('commentsList', JSON.stringify(this.commentsArray));
    }


  }
  onSubmitEdit(parentIndex: any, childIndex: any) {
    localStorage.setItem('commentsList', JSON.stringify(this.commentsArray));
    this.commentsArray[parentIndex].subcomments[childIndex].isEditable = !this.commentsArray[parentIndex].subcomments[childIndex].isEditable;

  }
}
