import 'reflect-metadata';

export function PageRoute(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(
            propertyKey,
            {
                ...Reflect.getMetadata(propertyKey, target),
                route: path,
            },
            target,
        );
        return descriptor;
    };
}

export function RequestMapping(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(
            propertyKey,
            {
                ...Reflect.getMetadata(propertyKey, target),
                baseRoute: path,
            },
            target,
        );
        return descriptor;
    };
}

export function GetMapping(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(
            propertyKey,
            {
                ...Reflect.getMetadata(propertyKey, target),
                route: path,
                type: 'get',
            },
            target,
        );
        return descriptor;
    };
}

export function PostMapping(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(
            propertyKey,
            {
                ...Reflect.getMetadata(propertyKey, target),
                route: path,
                type: 'post',
            },
            target,
        );
        return descriptor;
    };
}

export function PutMapping(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(
            propertyKey,
            {
                ...Reflect.getMetadata(propertyKey, target),
                route: path,
                type: 'put',
            },
            target,
        );
        return descriptor;
    };
}

export function DeleteMapping(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(
            propertyKey,
            {
                ...Reflect.getMetadata(propertyKey, target),
                route: path,
                type: 'delete',
            },
            target,
        );
        return descriptor;
    };
}
