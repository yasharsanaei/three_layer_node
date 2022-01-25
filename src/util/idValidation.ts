export const isIdInvalid = (id: number | string): boolean => isNaN(typeof id === 'number' ? id : parseInt(id));
