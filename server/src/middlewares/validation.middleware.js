import ApiError from "../utils/ApiError.js"

export const validate = (schema) =>
{

    return (req,res,next)=>
    {

    const {error} = schema.validate(req.body);

    if(error)
    {
        return next(new ApiError(400 , error.details[0].message));
    }
    
    next();
    }
}


export const validateParams = (schema) => {

    return (req, res, next) => {

        const { error } = schema.validate(req.params);

        if (error) {
            throw new ApiError(400, error.details[0].message);
        }

        next();

    };

};