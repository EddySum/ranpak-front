import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  product = {
    "userId": "632949fe95a74e7fa7b79dff",
    "productId": "123456789",
    "name": "PS5",
    "info": "This a test product. To learn more, ask for more. Yes, this is used for gaming",
    "referenceNumber": 123,
    "country": "USA",
    "_id": "632b376cf38ed2be94031bae",
    "createdAt": "2022-09-21T16:10:20.994Z"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
