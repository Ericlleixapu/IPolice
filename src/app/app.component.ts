import { Component } from '@angular/core';
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
    { title: 'Seguridad ciudadana', url: '/seguridad', icon: 'body' },
    { title: 'Perros', url: '/perros', icon: 'paw' },
    { title: 'Marcadores', url: '/marks', icon: 'star' },
    //{ title: 'Documentación', url: '/docu', icon: 'id-card' },
    { title: 'Usuario', url: '/user', icon: 'person' },
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
