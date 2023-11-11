const internalServerError = (res, err) => {
    res.status(500).json({ "Internal server error": err.message });
}

const notFoundError = (res, el) => {
    res.status(404).json({ message: `${el} not found`, statusCode: 404 });
}

const notAuthToView = (res, prop) => {
    res.status(401).json({ message: `You are not authorized to view this ${prop}`, statusCode: 401 })
}

const notAuthToEdit = (res, prop) => {
    res.status(401).json({ message: `You are not authorized to edit this ${prop}`, statusCode: 401 })
}

const notAuthToDelete = (res, prop) => {
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
