class ApiError extends Error {
    constructor(
    statusCode,
    message="Something went wrong",
    errors=[],
    stack ="") {
    super(message);
    this.statusCode = statusCode;
    this.data=null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    
    if(stack) {
        this.stack = stack;
    }else {
        Error.captureStackTrace(this, this.constructor);
    }
}
}
//Nodejs gives Error class and we are over riding those class
//Things mentioned in constructor are the properties of Error class and are necessary to give in a call