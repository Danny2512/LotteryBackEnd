export const catchErrors = (fn) => async (req, res, next) => {
  try {
    const resp = await fn(req, res, next);
    return resp;
  } catch (error) {
    return next(error);
  }
};

export const notFound = (req, res, next) => {
  res.status(404).json({
    message: "Url no existe",
    isError: 1,
  });
};

export const developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    isError: 1,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      "<mark>$&</mark>"
    )
  };

  res.status(500).json({
    message: "Lo siento, ha ocurrido un error. ¡Vuelve a intentarlo o contáctate con nosotros!",
    isError: 1,
    error: errorDetails
  });
};

export const productionErrors = (err, req, res, next) => {
  res.status(500).json({
    message: "Lo siento, ha ocurrido un error. ¡Vuelve a intentarlo o contáctate con nosotros!",
    isError: 1
  });
};