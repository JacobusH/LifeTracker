import { GeoPoint } from "@firebase/firestore-types";

export interface TrackerDrugs {
  key: string,
  userKey: string,
  locationTaken: string,
  locationPoint: GeoPoint,
  drugType: string,
  amountTaken: number,
  amountType: string,
  notes: string,
  rating: number,
  consumptionDate: Date,
  type: 'drugs',
  commonType: string // same as 'drugType'. Used for dynamic service
}

export interface TrackerDrugsCommon {
  key: string,
  userKey: string,
  trackerDrugsKey: string,
  commonType: string,
}

export const trackerDrugsDyn = {
  locationTaken: {
    label: 'Location Taken',
    // value: 'Where are you?',
    type: 'text',
    validation: {
      required: true
    }
  },
  drugType: {
    label: 'Drug Type',
    options: [
            { label: "(choose one)", value: ''},
            { label: "MDMA", value: 'MDMA'},
            { label: "LSD", value: 'LSD'},
            { label: "Cocaine", value: 'Cocaine'}
          ],
    type: 'select',
    validation: {
      required: true
    }
  },
  amountTaken: {
    label: 'Amount Taken',
    value: 1,
    type: 'number',
    validation: {
      required: true
    }
  },
  amountType: {
    label: 'Delivery Method',
    options: [
            { label: "(choose one)", value: ''},
            { label: "Powder", value: 'Powder'},
            { label: "Pill", value: 'Pill'},
            { label: "Tab", value: 'Tab'},
          ],
    type: 'select',
    validation: {
      required: true
    }
  },
  notes: {
    label: 'Notes',
    // value: 'Any thoughts on this weed?',
    type: 'textarea',
    validation: {
      required: false
    }
  },
  rating: {
    label: 'Rating',
    value: 5,
    // type: 'rating',
    type: 'text',
    validation: {
      required: true
    }
  },
  locationLat: {
    label: 'Latitude',
    type: 'text',
    value: '',
    validation: {
      required: false
    }
  },
  locationLong: {
    label: 'Longitude',
    type: 'text',
    value: '',
    validation: {
      required: false
    }
  },
  consumptionDate: {
    label: 'Consumption Date',
    type: 'date',
    value: '',
    validation: {
      required: true
    }
  }
}

// export const person = {
//   name: {
//     label: 'Name',
//     value: 'Juri',
//     type: 'text',
//     validation: {
//       required: true
//     }
//   },
//   age: {
//     label: 'Age',
//     value: 32,
//     type: 'text'
//   },
//   gender: {
//     label: 'Gender',
//     value: 'M',
//     type: 'radio',
//     options: [
//       { label: "Male", value: 'M'},
//       { label: "Female", value: 'F'}
//     ]
//   }, 
//   city: {
//     label: 'City',
//     value: '39010',
//     type: 'select',
//     options: [
//       { label: "(choose one)", value: ''},
//       { label: "Bolzano", value: '39100'},
//       { label: "Meltina", value: '39010'},
//       { label: "Appiano", value: '39057'}
//     ],
//     validation: {
//       required: true
//     }
//   }
// }