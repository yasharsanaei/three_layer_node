import 'reflect-metadata';
import {PageController} from '../controller/page.controller';
import {Express} from 'express';
import {BaseResource} from '../_base/base.resource';

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

const ResourceMethods = (resource: any): string[] => {
    return Reflect.getMetadataKeys(resource);
};

export const CreateApiPaths = (app: Express, resource: BaseResource<any>) => {
    ResourceMethods(resource).forEach(m => {
        const type = Reflect.getMetadata(m, resource)['type'];
        const route = Reflect.getMetadata(m, resource)['route'];
        app[type](`/api${resource.basePath}${route}`, (req, res, next) => {
            const result = resource[m](req, res, next);
            routeHandler(result, res);
        });
    });
};

export const GetPageRoutes = (app: Express, resource: PageController) => {
    ResourceMethods(resource).forEach(m => {
        const type = Reflect.getMetadata(m, resource)['type'];
        const route = Reflect.getMetadata(m, resource)['route'];
        app[type](`${route}`, (req, res, next) => {
            const result = resource[m](req, res, next);
            routeHandler(result, res);
        });
    });
};

function routeHandler(result: any, res) {
    if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
    } else if (result !== null && result !== undefined) {
        res.json(result);
    }
}