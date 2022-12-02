import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    private alertC: AlertController,
    private toastC: ToastController,
    private loadingC: LoadingController
  ) { }
  
  arraySearch(str: string): string[] {
    const minLength = 3;
    str = this.stringToSearchString(str);
    const array: string[] = [];
    for (const s of str.split(' ')) {
      if (s.length > minLength) {
        for (let i = s.length; i >= minLength; i--) {
          array.push(s.substring(0, i));
        }
      } else {
        array.push(s);
      }
    }
    return array;
  }
  
  async errorAlert(): Promise<void> {
    const alert = await this.alertC.create({
      cssClass: 'text',
      header: 'Alerta',
      message: 'Error',
      buttons: [{
        text: 'ok',
      }],
    });
    await alert.present();
  }
  
  async errorToast(duration = 1500): Promise<void> {
    const toast = await this.toastC.create({
      message: 'Error',
      duration,
    });
    await toast.present();
    return;
  }
  
  async getUrlToBase64(url: string): Promise<string | null> {
    const res = await fetch(url);
    if (res.ok) {
      const blob = await res.blob();
      const result = await new Promise<string | null>((resolve) => {
        const reader = new FileReader();
        reader.addEventListener(
          'load',
          () => {
            const resut = reader.result as string;
            resolve(resut.replace('data:application/json;', 'data:image/png;'));
          },
          false
        );
        reader.onerror = () => {
          resolve(null);
        };
        reader.readAsDataURL(blob);
      });
      return result;
    } else {
      return null;
    }
  }
  
  async normalAlert(message: string): Promise<void> {
    const alert = await this.alertC.create({
      cssClass: 'text',
      message,
      buttons: [{
        text: 'ok',
      }],
    });
    await alert.present();
  }
  
  async normalLoading(message = 'Cargando'): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingC.create({
      message: `${message}...`,
    });
    await loading.present();
    return loading;
  }
  
  async normalToast(message: string, duration: number = 1500): Promise<void> {
    const toast = await this.toastC.create({
      message: message,
      duration,
      position: 'bottom',
    });
    await toast.present();
  }
  
  sortArray<T>(array: T[], field: string, order: 'asc' | 'desc' = 'asc'): Array<T> {
    const newArray = [...array];
    if (newArray.length > 0 && (newArray[0] as any)[field]) {
      newArray.sort((a: any, b: any) => {
        if (a[field] > b[field]) {
          if (order === 'asc') {
            return 1;
          } else {
            return -1;
          }
        } else if (a[field] < b[field]) {
          if (order === 'asc') {
            return -1;
          } else {
            return 1;
          }
        } else {
          return 0;
        }
      });
    }
    return newArray;
  }
  
  stringToSearchString(s: string): string {
    s = s.toLowerCase();
    s = s.split(new RegExp(/\s+/g)).join(' ');
    s = s.split(new RegExp(/[àáâãäå]/g)).join('a');
    s = s.split(new RegExp(/æ/g)).join('ae');
    s = s.split(new RegExp(/ç/g)).join('c');
    s = s.split(new RegExp(/[èéêë]/g)).join('e');
    s = s.split(new RegExp(/[ìíîï]/g)).join('i');
    s = s.split(new RegExp(/ñ/g)).join('n');
    s = s.split(new RegExp(/[òóôõö]/g)).join('o');
    s = s.split(new RegExp(/œ/g)).join('oe');
    s = s.split(new RegExp(/[ùúûü]/g)).join('u');
    s = s.split(new RegExp(/[ýÿ]/g)).join('y');
    s = s.split(new RegExp(/\W/g)).join(' ');
    return s;
  }
  
  stringToFirebaseRoot(s: string): string {
    s = s.split('.').join('');
    s = s.split('$').join('');
    s = s.split('#').join('');
    s = s.split('[').join('');
    s = s.split(']').join('');
    s = s.split('/').join('');
    s = s.split('☺').join('');
    s = s.split('☻').join('');
    s = s.split('♥').join('');
    s = s.split('♦').join('');
    s = s.split('♣').join('');
    s = s.split('♠').join('');
    s = s.split('•').join('');
    s = s.split('◘').join('');
    s = s.split('○').join('');
    s = s.split('◙').join('');
    s = s.split('♀').join('');
    s = s.split('♪').join('');
    s = s.split('♫').join('');
    s = s.split('☼').join('');
    s = s.split('►').join('');
    s = s.split('◄').join('');
    s = s.split('↕').join('');
    s = s.split('‼').join('');
    s = s.split('¶').join('');
    s = s.split('§').join('');
    s = s.split('▬').join('');
    s = s.split('↨').join('');
    s = s.split('↑').join('');
    s = s.split('↓').join('');
    s = s.split('→').join('');
    s = s.split('←').join('');
    s = s.split('∟').join('');
    s = s.split('↔').join('');
    s = s.split('▲').join('');
    s = s.split('▼').join('');
    s = s.split('⌂').join('');
    s = s.split(new RegExp(/\s+/g)).join(' ');
    s = s.split(new RegExp(/[àáâãäå]/g)).join('a');
    s = s.split(new RegExp(/æ/g)).join('ae');
    s = s.split(new RegExp(/ç/g)).join('c');
    s = s.split(new RegExp(/[èéêë]/g)).join('e');
    s = s.split(new RegExp(/[ìíîï]/g)).join('i');
    s = s.split(new RegExp(/ñ/g)).join('n');
    s = s.split(new RegExp(/[òóôõö]/g)).join('o');
    s = s.split(new RegExp(/œ/g)).join('oe');
    s = s.split(new RegExp(/[ùúûü]/g)).join('u');
    s = s.split(new RegExp(/[ýÿ]/g)).join('y');
    return s;
  }
  
  styleScrollbars(elmt: HTMLElement | null): void {
    const stylesheet = `
      ::-webkit-scrollbar {
        width: 8px;
        background: #ffffff;
      }
      ::-webkit-scrollbar-thumb {
        background: #12316b;
        border-radius: 8px;
      }
    `;
    if (elmt?.shadowRoot) {
      const styleElmt = elmt?.shadowRoot.querySelector('style');
      if (styleElmt) {
        styleElmt.append(stylesheet);
      } else {
        const barStyle = document.createElement('style');
        barStyle.append(stylesheet);
        elmt?.shadowRoot.appendChild(barStyle);
      }
    }
  }
  
  timeSince(date: Date): string {
    const nowSeconds = (new Date()).getTime() / 1000;
    const thenSeconds = date.getTime() / 1000;
    const seconds = Math.floor((nowSeconds - thenSeconds));
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + ' años';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' meses';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' dias';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' horas';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutos';
    }
    return Math.floor(seconds) + ' segundos';
  }
}
