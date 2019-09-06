import { GridsterConfig, GridsterItem, DisplayGrid, GridType } from 'angular-gridster2';

export interface GridLayout {
  key: string,
  userKey: string,
	layout: Array<GridsterItem>,
}