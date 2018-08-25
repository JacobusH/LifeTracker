import { GeoPoint } from "@firebase/firestore-types";

export * from './beer/beer.model';
export * from './drugs/drugs.model';
export * from './food/food.model';
export * from './weed/weed.model';

// TODO: finish other models

export interface TrackerBase {
  key: string,
  userKey: string,
  locationPoint: GeoPoint,
  name: string,
  amountType: string,
  notes: string,
  rating: number,
  consumptionLocation: string,
  consumptionAmount: number,
  consumptionDate: Date,
  type: string // 'weed'
}

export interface TrackerCommon {
  key: string,
  userKey: string,
  trackerKey: string,
  commonType: string,
  commonTypeExtra: string,
  commonRating: number,
  commonCount: { 'count': number, 'type': string }
}

export enum TrackerTypeEnum {
  'BEER',
  'DRUGS',
  'FOOD',
  'MUSIC',
  'WEED',
  'WORKOUT',
}