import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { GoodService, Good } from '../shared/good/good.service';

@Component({
  selector: 'app-good-edit',
  templateUrl: './good-edit.component.html',
  styleUrls: ['./good-edit.component.css']
})
export class GoodEditComponent implements OnInit {
  good: Good = <Good> {};
  goodForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private goodService: GoodService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.has("id"))  {
      let id = this.route.snapshot.params.id;

      this.goodService.get(id)
        .subscribe(data => {
          this.good = <Good> data;
          this.goodForm.get('name')!.setValue(this.good.name);
        });
    }
  }

  onSubmit(): void {
    if(this.route.snapshot.paramMap.has("id"))  {
      let id = this.route.snapshot.params.id;
      this.good.id = id;
    }

    this.good.name = this.goodForm.get('name')!.value;
    this.goodService.save(this.good).subscribe(
      { complete() { window.location.href = '/goods'; } }
    );
  }
}
