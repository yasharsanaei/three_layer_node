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
