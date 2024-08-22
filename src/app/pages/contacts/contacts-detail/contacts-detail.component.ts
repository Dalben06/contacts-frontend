import { Component, inject, model, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contact } from '../model/contact.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from '../service/contacts.service';

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
})
export class ContactsDetailComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ContactsDetailComponent>);
  data = inject<any>(MAT_DIALOG_DATA);
  form: FormGroup;
  onNoClick(): void {
    this.dialogRef.close();
  }
  constructor(private _formBuilder: FormBuilder,private _contactService: ContactsService ) {
    this.form = this._formBuilder.group({
      uuId: [null, Validators.nullValidator],
      name: [null, Validators.required],
      number: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      formatNumber: [null, Validators.nullValidator],
      code: [null, Validators.min(1)],
    });
  this.form.patchValue(this.data.contact); 

      
   }

  ngOnInit() {

  }

  submitContact(): void{
    if(this.form.invalid) return;

    if(this.form.controls['uuId'].value !== null){
      this._contactService.update(this.form.value)
      .subscribe({
        next: (res) => {
          this.dialogRef.close();
        },
        error: (res) => {
          console.log(`error`, res.errors)
        },
      });
    }
    this.form.controls['uuId'].setValue(`00000000-0000-0000-0000-000000000000`);  
    this._contactService.create(this.form.value)
        .subscribe({
          next: (res) => {
            this.dialogRef.close();
          },
          error: (res) => {
            console.log(`error`, res.errors)
          },
        });
  }

}
