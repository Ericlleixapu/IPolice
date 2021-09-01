import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Notas', url: '/notas', icon: 'create' },
    { title: 'Calendario', url: '/calendario', icon: 'calendar' },
    { title: 'Trafico', url: '/trafico', icon: 'car-sport' },
    //{ title: 'Seguridad ciudadana', url: '/seguridad', icon: 'body' },
    { title: 'Marcadores', url: '/marks', icon: 'star' },
    { title: 'Razas Peligrosas', url: '/perros', icon: 'paw' },    
    //{ title: 'Documentación', url: '/docu', icon: 'id-card' },
    //{ title: 'Usuario', url: '/user', icon: 'person' },
  ];
  public dark = false;
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  private _storage: Storage | null = null;

  constructor(private storage: Storage,private platform: Platform) {
    document.body.classList.toggle('dark', true)
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;       
    this.dark = await this.storage.get("theme") == "dark"?true:false;
  }

  changeTheme(){
    const theme = this.dark ? "dark":"light";
    this.storage.set("theme",theme);
  }

}
