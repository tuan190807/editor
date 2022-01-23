import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChildren('#imgHinhNen') listHinhNen: any;

  activeTab: number = 1;
  activeCollapse: number;
  soHoaDon1: number = 1;
  soHoaDon2: string = "C";
  soHoaDon3: string = '22';
  soHoaDon4: string = 'T';
  soHoaDon5: string = 'AA';
  cbSongNgu: boolean = true;
  activeFont: boolean = false;
  activeRowTable: string = 'rddong1';
  activeFirstRow: boolean = true;
  hasPrimeMinisterSignature: boolean = false;
  hasLogo: boolean = true;
  imageLogo: string | ArrayBuffer = '';
  sunkenLogo: boolean = false;
  imageSunkenLogo: string | ArrayBuffer = '';
  backgroundImage: boolean = true;
  imageRim: boolean = false;
  activeFormat = {
    b: false,
    i: false,
    u: false
  };

  get getImageLogo() {
    return this.imageLogo ? this.imageLogo : "../assets/images/logo.png";
  }

  get getImageSunkenLogo() {
    return this.imageSunkenLogo ? this.imageSunkenLogo : "../assets/images/logo.png";
  }

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    console.log(this.listHinhNen)
  }

  handleTabs(active: number) {
    this.activeTab = active;
  }

  handleCollapse(active: number) {
    if (this.activeCollapse === active) {
      this.activeCollapse = null;
    } else {
      this.activeCollapse = active;
    }
  }

  updateAllColor(color) {
    (document.querySelectorAll('.chinhSua')).forEach((element: HTMLElement) => {
      element.style.color = color;
    });
  }

  changeColor(color) {
    (document.querySelectorAll('.chinhSua')).forEach((element: HTMLElement) => {
      element.style.color = color;
    });
  }

  SelectAll(value) {
    (document.querySelectorAll('.chinhSua')).forEach((element: HTMLElement) => {
      if (value === 'add') {
        this.activeFont = true;
        this.renderer.addClass(element, 'clickChon')
      } else {
        this.activeFont = false;
        this.renderer.removeClass(element, 'clickChon')
      }
    });
  }

  ToggleFontFamily(font) {
    if (this.activeFont) {
      (document.querySelectorAll('.clickChon')).forEach((element: HTMLElement) => {
        element.style.fontFamily = font;
      });
    }
  }

  ToggleFontSize(fontSize) {
    if (this.activeFont) {
      (document.querySelectorAll('.clickChon')).forEach((element: HTMLElement) => {
        element.style.fontSize = fontSize + 'px';
      });
    }
  }

  FormatText(type) {
    switch (type) {
      case 'bold':
        this.activeFormat.b = !this.activeFormat.b;
        (document.querySelectorAll('.clickChon')).forEach((element: HTMLElement) => {
          if (this.activeFormat.b) {
            console.log("vào đay")
            element.style.fontWeight = type;
          }
          else
            element.style.fontWeight = 'normal';
        });
        break;
      case 'italic':
        this.activeFormat.i = !this.activeFormat.i;
        (document.querySelectorAll('.clickChon')).forEach((element: HTMLElement) => {
          if (this.activeFormat.i)
            element.style.fontStyle = type;
          else
            element.style.fontStyle = 'normal';
        });
        break;
      case 'underline':
        this.activeFormat.u = !this.activeFormat.u;
        (document.querySelectorAll('.clickChon')).forEach((element: HTMLElement) => {
          if (this.activeFormat.u)
            element.style.textDecoration = type;
          else
            element.style.textDecoration = 'none';
        });
        break;
    }
  }

  ToogleThongTinNguoiMua(value) {
    if (value) {
      (document.querySelectorAll('.thongTinNguoiMua .value')).forEach((element: HTMLElement) => {
        element.style.borderBottom = 'dotted 1px';
      });
    } else {
      (document.querySelectorAll('.thongTinNguoiMua .value')).forEach((element: HTMLElement) => {
        element.style.borderBottom = 'none';
      });
    }
  }

  ToggleBang(value) {
    if (value) {
      this.ToggleKieuDong(this.activeRowTable);
    }
    else {
      (document.querySelectorAll('tr.bordermo1')).forEach((element: HTMLElement) => {
        element.style.borderBottom = 'none';
      });
    }
  }

  ToggleKieuDong(value) {
    console.log("🚀 ~ file: editor.component.ts ~ line 151 ~ EditorComponent ~ ToggleKieuDong ~ value", value)
    this.activeRowTable = value;
    if (value === "rddong1") {
      (document.querySelectorAll('tr.bordermo1')).forEach((element: HTMLElement) => {
        element.style.borderBottom = '1px dashed rgb(204, 204, 204)';
      });
    } else {
      (document.querySelectorAll('tr.bordermo1')).forEach((element: HTMLElement) => {
        element.style.borderBottom = '1px solid rgb(204, 204, 204)';
      });
    }
  }

  ToggleTongTien(value) {
    switch (value) {
      case '1':
        (document.querySelectorAll('.item-invoice td')).forEach((element: HTMLElement) => {
          element.style.borderStyle = 'solid';
        });
        break;
      case '2':
        (document.querySelectorAll('.item-invoice td')).forEach((element: HTMLElement) => {
          element.style.borderStyle = 'none';
        });
        break;
      case '3':
        break;
      case '4':
        break;
      case '5':
        break;
    }
  }

  ChangeLogo(e) {
    const files = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imageLogo = this.ShowImagePreview(reader.result);
    }
    reader.readAsArrayBuffer(files);
  };

  ShowImagePreview = (binaryStr) => {
    let binary = '';
    const bytes = new Uint8Array(binaryStr);

    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/jpg;base64, ' + btoa(binary);

  }

  ChangeLogoSize(size) {
    (document.querySelector('img.logo-img') as HTMLElement).style.width = size + '%';
  }

  ChangeSunkenLogo(e) {
    const files = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imageSunkenLogo = this.ShowImagePreview(reader.result);
    }
    reader.readAsArrayBuffer(files);
  }

  ChangeSunkenLogoSize(size, type) {
    if (type === 'logochim') {
      (document.querySelector('#imgLogoChim') as HTMLElement).style.width = size + 'px';
    } else {
      (document.querySelector('#imgHinhNen') as HTMLElement).style.width = size + 'px';
    }
  }

  ChangeSunkenLogoOpacity(value, type) {
    if (type === 'logochim') {
      (document.querySelector('#imgLogoChim') as HTMLElement).style.opacity = `${value / 100}`;
    } else {
      (document.querySelector('#imgHinhNen') as HTMLElement).style.opacity = `${value / 100}`;
    }
  }


}
