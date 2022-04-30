import { electronApiInterface } from './../electron/apiFunctions';

declare global {
    interface Window {
        electron?: electronApiInterface;
        sample?: any
    }
}