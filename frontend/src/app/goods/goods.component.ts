import { Component, OnInit } from '@angular/core';
import { GoodService,Good } from '../shared/good/good.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  goods: Array<Good> = [];
  interval: any;

  constructor(private goodService: GoodService) { }

  ngOnInit(): void {
    this.refreshData();
    this.interval = setInterval(() => { this.refreshData(); }, 2500);
  }

  refreshData(): void  {
    this.goodService.getAll()
      .subscribe(data => {
        this.goods = data;
      });

  }

  onSampleData(): void {
    this.goodService.gen_sample_data().subscribe();
  }

  onDelete(id: number): void  {
    this.goodService.delete(id).subscribe();
  }

  onClear(): void  {
    this.goodService.clear().subscribe();
  }
}
