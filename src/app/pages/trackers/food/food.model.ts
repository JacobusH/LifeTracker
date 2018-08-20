import { GeoPoint } from "@firebase/firestore-types";

export interface TrackerFood {
  key: string,
  userKey: string,
  locationEaten: string,
  locationPoint: GeoPoint,
  foodName: string,
  amountEaten: number,
  notes: string,
  rating: number,
  consumptionDate: Date,
  type: 'food',
  commonType: string // same as 'foodName'. Used for dynamic service
}

export interface TrackerFoodCommon {
  key: string,
  userKey: string,
  trackerFoodKey: string,
  commonType: string,
}

export const trackerFoodDyn = {
  locationEaten: {
    label: 'Location Eaten',
    // value: 'Where are you?',
    type: 'text',
    validation: {
      required: true
    }
  },
  foodName: {
    label: 'Food Name',
    // value: 'Any thoughts on this weed?',
    type: 'text',
    validation: {
      required: true
    }
  },
  amountEaten: {
    label: 'Amount Eaten',
    value: 1,
    type: 'number',
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