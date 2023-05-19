import { environment } from "src/environments/environment";
import { environment as _env} from "src/environments/environment.prod";

export const BASE_URL = _env.production ? _env.apiUrl : environment.apiUrl;
export const SIGNUP_URL = BASE_URL + '/users/signup';
export const LOGIN_URL = BASE_URL + '/users/login';
export const PRODUCTS_URL = BASE_URL + '/products/';
export const CREATE_PRODUCT_URL = PRODUCTS_URL + 'add';
export const EDIT_PRODUCT_URL = PRODUCTS_URL + 'edit/';
export const DELETE_PRODUCT_URL = PRODUCTS_URL + 'delete/';
