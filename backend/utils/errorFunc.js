const internalServerError = (res, err) => {
    console.log({ "Internal server error": err.message })
    res.status(500).json({ "Internal server error": err.message });
}

const notFoundError = (res, el) => {
    console.log({ "Not found error": el })
    res.status(404).json({ message: `${el} not found`, statusCode: 404 });
}

const notAuthToView = (res, prop) => {
    console.log({ "Not authorized to view": prop })
    res.status(401).json({ message: `You are not authorized to view this ${prop}`, statusCode: 401 })
}

const notAuthToEdit = (res, prop) => {
    console.log({ "Not authorized to edit": prop })
    res.status(401).json({ message: `You are not authorized to edit this ${prop}`, statusCode: 401 })
}

const notAuthToDelete = (res, prop) => {
    console.log({ "Not authorized to delete": prop })
    res.status(401).json({ message: `You are not authorized to delete this ${prop}`, statusCode: 401 })
}


const nextError = (next, msg, status) => {
    const error = new Error(msg);
    error.status = status;
    return next(error);
};


module.exports = {
    internalServerError,
    notFoundError,
    notAuthToView,
    notAuthToEdit,
    notAuthToDelete,
    nextError,
}
