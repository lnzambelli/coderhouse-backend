const productKeys = ['title', 'description', 'price','code','stock','status','category'];

function validate(data, keys) {
    const dataKeys = Object.keys(data);
    return (
      keys.every((key) => dataKeys.includes(key)) &&
      dataKeys.every((key) => keys.includes(key))
    );
}

function validatePartial(data, keys) {
    const dataKeys = Object.keys(data);
    return (
      dataKeys.length <= keys.length &&
      dataKeys.every((key) => keys.includes(key))
    );
}

export function validateProduct(maybeProduct) {
    return validate(maybeProduct, productKeys);
}
export function validateProductPartial(maybeProductPartial) {
    return validatePartial(maybeProductPartial, productKeys);
}