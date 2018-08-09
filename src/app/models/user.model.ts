export interface User {
    authID: string,
    authMethod: string,
    authDisplayName: string,
    authPhotoUrl: string,
    key: string,
    name: string,
    email: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
  }