import { Component, OnInit } from '@angular/core';
import { Post} from '../models/post.model';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  post: Post;

  constructor(
              private actroute: ActivatedRoute,
              private router: Router,
              ) {
    this.actroute.queryParams.subscribe(
        params => {
          if (params && params.special) {
            this.post = JSON.parse(params.special) as Post;
          }
        }
    );
  }
  ngOnInit() {
  }

}
