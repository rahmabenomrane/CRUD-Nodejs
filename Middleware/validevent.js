import Joi from "joi";

export const validateEvent = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    startDate: Joi.date().iso().required().messages({
      "date.format": `"startDate" doit être au format ISO (YYYY-MM-DD).`,
    }),
    endDate: Joi.date()
      .iso()
      .greater(Joi.ref("startDate"))
      .required()
      .messages({
        "date.greater": `"endDate" doit être après "startDate".`,
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ message: error.details.map((e) => e.message) });
  }
  next();
};
