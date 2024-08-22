import { Routes } from '@angular/router';
import { ContactsListComponent } from './contacts-list/contacts-list.component';

export const ContactsRoutes: Routes = [
  {
    path: '',
    component: ContactsListComponent,
    data: {
      title: 'Starter Page',
    },
  },
];
