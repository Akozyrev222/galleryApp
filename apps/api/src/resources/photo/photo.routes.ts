import { routeUtil } from 'utils';

import photoUpload from './actions/photo-upload';

const publicRoutes = routeUtil.getRoutes([
 photoUpload
]);



export default {
    publicRoutes,
};
