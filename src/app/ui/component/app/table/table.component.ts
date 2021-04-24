import { Component } from '@angular/core';

const ELEMENT_DATA: { status: number; subject: string; createdBy: string; updatedAt: string }[] = [
  { status: 1, subject: 'Hydrogen', createdBy: 'rchevalier', updatedAt: new Date().toISOString()  },
  { status: 2, subject: 'Helium', createdBy: 'rchevalier', updatedAt: new Date().toISOString()  },
  { status: 3, subject: 'Lithium', createdBy: 'rchevalier', updatedAt: new Date().toISOString() },
  { status: 4, subject: 'Beryllium', createdBy: 'rchevalier', updatedAt: new Date().toISOString() },
  { status: 5, subject: 'Boron', createdBy: 'rchevalier', updatedAt: new Date().toISOString() },
  { status: 6, subject: 'Carbon', createdBy: 'rchevalier', updatedAt: new Date().toISOString() },
  { status: 7, subject: 'Nitrogen', createdBy: 'rchevalier', updatedAt: new Date().toISOString() },
  { status: 8, subject: 'Oxygen', createdBy: 'rchevalier', updatedAt: new Date().toISOString() },
  { status: 9, subject: 'Fluorine', createdBy: 'rchevalier', updatedAt: new Date().toISOString() },
  { status: 10, subject: 'Neon', createdBy: 'rchevalier', updatedAt: new Date().toISOString() },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  displayedColumns: string[] = ['status', 'subject', 'createdBy', 'updatedAt'];
  dataSource = ELEMENT_DATA;
}
