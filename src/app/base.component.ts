export abstract class BaseComponent {
    onError(err: Object): void {
        alert('Operation not permitted or something went wrong in the back-end. Check the server logs.');
    }
}
