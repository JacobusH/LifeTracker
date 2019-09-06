import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { GridsterConfig, GridsterItem, DisplayGrid, GridType } from 'angular-gridster2';
// import { UUID } from 'angular2-uuid';
import { v4 as uuid } from 'uuid';
import * as firebase from 'firebase/app';

export interface IComponent {
  id: string;
  componentRef: string;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
	currentUserKey: string;
  colAllTrackers = "allTrackers"
  colBase = 'tracker';
  docLayout = '!gridLayout';

  public options: GridsterConfig = {
    draggable: { enabled: true },
    pushItems: true,
		gridType: GridType.Fit,
		displayGrid: DisplayGrid.Always,
		enableEmptyCellDrop: true,
		enableEmptyCellDrag: true,
		emptyCellDragMaxCols: 50,
		emptyCellDragMaxRows: 50,
		emptyCellClickCallback: this.emptyCellClick.bind(this),
		emptyCellDropCallback: this.emptyCellClick.bind(this),
		emptyCellDragCallback: this.emptyCellClick.bind(this),
		resizable: {
			delayStart: 0,
			enabled: true,
			handles: {
				s: true,
				e: true,
				n: true,
				w: true,
				se: true,
				ne: true,
				sw: true,
				nw: true
			}
		},
  };

	public layout: GridsterItem[] = [
		{cols: 2, rows: 1, y: 0, x: 0},
		{cols: 2, rows: 2, y: 0, x: 2},
		{cols: 1, rows: 1, y: 0, x: 4},
		{cols: 3, rows: 2, y: 1, x: 4},
		{cols: 1, rows: 1, y: 4, x: 5},
		{cols: 1, rows: 1, y: 2, x: 1},
		{cols: 2, rows: 2, y: 5, x: 5},
		{cols: 2, rows: 2, y: 3, x: 2},
		{cols: 2, rows: 1, y: 2, x: 2},
		{cols: 1, rows: 1, y: 3, x: 4},
		{cols: 1, rows: 1, y: 0, x: 6}
	];

  public components: IComponent[] = [];

  dropId: string;

  constructor(
		private userService: UserService,
    private authService: AuthService
	) { 
		this.authService.user.subscribe(x => {
      this.currentUserKey = x.authID;
    })
	}
	
	setDropId(dropId: string): void {
		this.dropId = dropId;
	}

  addItem(): void {
		this.layout.push(
			{id: uuid(), x: 0, y: 0, cols: 1, rows: 1}
		);
  }

  deleteItem(id: string): void {
    const item = this.layout.find(d => d.id === id);
    this.layout.splice(this.layout.indexOf(item), 1);
    const comp = this.components.find(c => c.id === id);
    this.components.splice(this.components.indexOf(comp), 1);
  }

  dropItem(dragId: string): void {
    const { components } = this;
    const comp: IComponent = components.find(c => c.id === this.dropId);
    const updateIdx: number = comp ? components.indexOf(comp) : components.length;
    const componentItem: IComponent = {
      id: this.dropId,
      componentRef: dragId
    };
    this.components = Object.assign([], this.components, { [updateIdx]: componentItem });
	}
	
	emptyCellClick(event: MouseEvent, item: GridsterItem) {
    // console.info('empty cell click', event, item);
    this.layout.push(item);
  }

  getComponentRef(id: string): string {
    const comp = this.components.find(c => c.id === id);
    return comp ? comp.componentRef : null;
	}
	
	// DATABASE OPERATIONS	
	layoutGet(trackerName: string): AngularFirestoreDocument<{layout: Array<GridsterItem>}> {
		trackerName = trackerName.replace(/\s/g, '');
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
      .doc(this.docLayout);
	}

	layoutAdd(trackerName: string, item: GridsterItem) {
		this.userService
    .getByUserKey(this.currentUserKey)
    .collection(this.colBase + trackerName,
      ref => ref.where('name', '==', trackerName)
    )
    .doc(this.docLayout)
    .update({
      labels: firebase.firestore.FieldValue.arrayUnion(item)
    });
	}

	layoutRemove(trackerName: string, item: GridsterItem) {
		this.userService
    .getByUserKey(this.currentUserKey)
    .collection(this.colBase + trackerName,
      ref => ref.where('name', '==', trackerName)
    )
    .doc(this.docLayout)
    .update({
      labels: firebase.firestore.FieldValue.arrayRemove(item)
    });
	}

}
