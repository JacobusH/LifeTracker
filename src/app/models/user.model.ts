export interface User {
    authID: string,
    authMethod: string,
    authDisplayName: string,
    authPhotoUrl: string,
    key: string,
    name: string,
    email: string,
    password: string,
    roles: Array<string>,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
  }