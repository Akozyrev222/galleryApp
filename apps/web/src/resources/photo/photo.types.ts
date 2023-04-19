import {StorageReference} from "@firebase/storage";

export interface Photo {
  _id: string ;
  createdOn?: Date;
  updatedOn?: Date;
  lastRequest?: Date;
  deletedOn?: Date | null;
  userId: string ;
  title: string;
  firebaseUrl?: string;
}
