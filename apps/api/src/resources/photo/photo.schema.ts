import {z} from 'zod';

const schema = z.object({
    _id: z.string(),
    createdOn: z.date().optional(),
    updatedOn: z.date().optional(),
    lastRequest: z.date().optional(),
    deletedOn: z.date().optional().nullable(),
    userId: z.string(),
    title: z.string(),
    firebaseUrl: z.string(),
});

export default schema;
