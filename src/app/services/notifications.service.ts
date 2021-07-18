import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  showToast = async (message: string): Promise<void> => {
    await Toast.show({
      text: message,
      position: 'bottom',
      duration: 'short'
    });
  }
}
