import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThongKe } from '../models/thongke';
import { ThongkeService } from '../services/thongke.service';
import { pieChart } from '../models/thongke';
import { doughChart } from '../models/thongke';
import { MenuItemContent } from 'primeng/menu';
@Component({
  selector: 'app-feature-statistic',
  templateUrl: './statis.component.html',
  styleUrls: ['./statis.component.scss']
})
export class FeatureStatisticComponent implements OnInit {
  datapie: any;

  chartOptionspie: any;
  datapie1: any;

  chartOptionspie1: any;
  pie_chart: pieChart[] = [];
  doughnut_chart: doughChart[] = [];
  cities: City[] = [];
  selectedCity?: City;
  data: any;
  chartOptions: any;
  displayModal: boolean = false;
  displayModalpie: boolean = false;
  basicData: any;
  basicOptions: any;
  pieChartDate: Date = new Date();
  date10?: Date;
  month: number = this.pieChartDate.getMonth();
  year: number = this.pieChartDate.getFullYear();;

  dates?: Date[];
  thongkethang: ThongKe[] = [];
  rangeDates?: Date[]
  minDate?: Date
  maxDate?: Date
  thang: any[] = [];
  tienThang: ThongKe[] = []
  invalidDates?: Array<Date>


  constructor(private thongkeService: ThongkeService) {
    this.cities = [
      { name: 'Mặt hàng 1', code: 'NY' },
      { name: 'Mặt hàng 2', code: 'RM' },
      { name: 'Mặt hàng 3', code: 'LDN' },
      { name: 'Mặt hàng 4', code: 'IST' },
      { name: 'Mặt hàng 5', code: 'PRS' }
    ];
  }

  showModalDialogpie() {
    const newDate = new Date();    
    let month1 = newDate.getMonth()+1;
    let year1=newDate.getFullYear();
    let month = this.pieChartDate.getMonth() + 1;
    let year = this.pieChartDate.getFullYear();
    this.updatePieChartXuat(month, year);
    this.updatePieChartNhap(month, year);
    this.updateDoughnutChartNhapXuat(month, year)
  }
  updatePieChartXuat(month: number, year: number) {
    console.log(month+1+" "+year);
    this.thongkeService.getExportPerc(month, year).subscribe((item) => {
      this.pie_chart = item
      let phantramList: number[] = []
      let nameList: string[] = [];
      this.pie_chart.forEach(item => {
        phantramList.push(item.phantram);
        nameList.push(item.nameloai);
      })
      this.datapie = {
        labels: nameList,
        datasets: [
          {
            data: phantramList,
            backgroundColor: [
              "orange",
              "blue",
              "red",
              "black",
              "pink",
              "yellow",
              "brown",
            ],
            hoverBackgroundColor: [
              "#66BB6A",
              "#81C784",
              "#FFB74D"
            ]
          }
        ]
      };

    });
  }
  updatePieChartNhap(month: number, year: number) {
    this.thongkeService.getImportPerc(month, year).subscribe((item) => {
      this.pie_chart = item
      let phantramList: number[] = []
      let nameList: string[] = [];
      this.pie_chart.forEach(item =>{
        phantramList.push(item.phantram);
        nameList.push(item.nameloai);
      })
      this.datapie1 = {
        labels: nameList,
        datasets: [
          {
            data: phantramList,
            backgroundColor: [
              "orange",
              "blue",
              "red",
              "black",
              "pink",
              "yellow",
              "brown",
            ],
            hoverBackgroundColor: [
              "#66BB6A",
              "#81C784",
              "#FFB74D"
            ]
          }
        ]
      };

    });
  }
  
  updateDoughnutChartNhapXuat(month: number, year: number) {
    let soluongxuatList = 0;
    this.thongkeService.getExportDouc(month, year).subscribe((item) => {
      this.doughnut_chart = item
      this.doughnut_chart.forEach(item => {
        soluongxuatList += item.tongsoluong;
      })
      let soluongnhapList = 0;
      this.thongkeService.getImportDouc(month, year).subscribe((item) => {
        this.doughnut_chart = item
        this.doughnut_chart.forEach(item => {
          soluongnhapList += item.tongsoluong;
        })
        this.data = {
          labels: ['Total Import','Total Export'],
          datasets: [
              {
                  data: [soluongnhapList, soluongxuatList],
                  backgroundColor: [
                      
                      "#36A2EB",
                      "#FFCE56"
                  ],
                  hoverBackgroundColor: [
                      
                      "#36A2EB",
                      "#FFCE56"
                  ]
              }
          ]
      };
     // console.log(this.data)
      });
    });
    
  }

  ngOnInit(): void {
    let playStore: any = [];
    let playStor: any = [];
    this.thongkeService.getDoanhThuTheoThang().subscribe(data => {
      this.thongkethang = data;
      //  console.log(this.thongkethang)
      data.forEach(function (value) {
        playStore.push(value.gia);
        playStor.push(value.thang)
      });
      this.tienThang = playStore;

      this.basicData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'],
        datasets: [
          {
            label: 'Doanh thu theo năm',
            backgroundColor: 'red',
            data: this.tienThang
          }

        ]
      };
    })
  }
  loading = [false, false, false, false]

  load(index: any) {
    this.loading[index] = true;
    setTimeout(() => this.loading[index] = false, 1000);
  }

}
interface City {
  name: string,
  code: string
}
