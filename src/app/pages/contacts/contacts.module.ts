import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsRoutes } from './contacts.routing';
import { ContactsService } from './service/contacts.service';
import { APIService } from 'src/app/core/service/api.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ContactsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    ContactsListComponent,
    ContactsDetailComponent
  ],
  providers: [ContactsService, APIService],
  exports: []
})
export class ContactsModule { }
