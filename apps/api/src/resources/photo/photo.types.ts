import { z } from 'zod';

import schema from './photo.schema';

export type Photo = z.infer<typeof schema>;
