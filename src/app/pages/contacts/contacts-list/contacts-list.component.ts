import { ChangeDetectionStrategy, Component, inject, model, OnDestroy, OnInit, signal } from '@angular/core';
import { ContactsService } from '../service/contacts.service';
import { Contact } from '../model/contact.model';
import { MatDialog } from '@angular/material/dialog';
import { ContactsDetailComponent } from '../contacts-detail/contacts-detail.component';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
})
export class ContactsListComponent implements OnInit, OnDestroy {

  readonly dialog = inject(MatDialog);
  contacts: Contact[] = []
  isLoading: boolean = false;
  columnsToDisplay = ['name',`email`, 'formatNumber', `action`];

  constructor(private _contactService: ContactsService) { }
  ngOnDestroy(): void {
    this.contacts = [];
  }

  ngOnInit() {
    this.contacts = [];
    this.getContacts();
  }


  getContacts(): void {
    this.isLoading = true;
    this._contactService.getContacts().subscribe({
      next: (res) => {
          this.contacts = res;
          } ,
      error: (err) => {
          // this._notificationService.error(err.error);
          this.isLoading = false
      },
      complete: () => this.isLoading = false
    });
  }


  openDetail(contact: Contact | null){
    if(contact ==  null) contact = JSON.parse(JSON.stringify(new Contact()));

    const dialogRef = this.dialog.open(ContactsDetailComponent,{
      data: {contact},
      minHeight: `500px`,
      minWidth: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContacts();
    });
  }

  removeContact(uuId: string): void{
    this._contactService.delete(uuId).subscribe({
      next: (res) => {
          this.getContacts();
          } ,
      error: (err) => {
          this.isLoading = false
      },
      complete: () => this.isLoading = false
    });
  }


  
}
