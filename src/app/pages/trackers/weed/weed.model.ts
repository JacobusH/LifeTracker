import { GeoPoint } from "@firebase/firestore-types";

export interface TrackerWeed {
  key: string,
  userKey: string,
  locationSmoked: string,
  locationPoint: GeoPoint,
  name: string,
  weedStrain: string,
  amountSmoked: number,
  amountType: string,
  notes: string,
  rating: number,
  consumptionDate: Date,
  type: string // 'weed'
}

export interface TrackerWeedCommon {
  key: string,
  userKey: string,
  trackerWeedKey: string,
  commonType: string,
}

export const trackerWeedDyn = {
  locationSmoked: {
    label: 'Location Smoked',
    // value: 'Where are you?',
    type: 'text',
    validation: {
      required: true
    }
  },
  name: {
    label: 'Name',
    // value: 'What weed did you enjoy?',
    type: 'text',
    validation: {
      required: true
    }
  },
  weedStrain: {
    label: 'Strain',
    options: [
            { label: "(choose one)", value: ''},
            { label: "Indica", value: 'Indica'},
            { label: "Sativa", value: 'Sativa'},
            { label: "Hybrid", value: 'Hybrid'}
          ],
    type: 'select',
    validation: {
      required: true
    }
  },
  amountSmoked: {
    label: 'Amount Smoked',
    value: 1,
    type: 'number',
    validation: {
      required: true
    }
  },
  amountType: {
    label: 'Smoking device',
    options: [
            { label: "(choose one)", value: ''},
            { label: "Bowl", value: 'Bowl'},
            { label: "Joint", value: 'Joint'},
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