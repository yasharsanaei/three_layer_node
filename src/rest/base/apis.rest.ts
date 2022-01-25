import {Rest} from './rest';
import {BlogRest} from '../blog.rest';
import {ViewRoutes} from '../../controller/page.controller';

export const ApisRest: Rest[] = [
    ...ViewRoutes,
    ...BlogRest,
];