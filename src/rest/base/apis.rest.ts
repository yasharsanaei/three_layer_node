import {Rest} from './rest';
import {BlogRest} from '../blog.rest';

export const ApisRest: Rest[] = [
    ...BlogRest,
];