const joi = require("joi")
const { safePromise } = require("../../utils/required-helper")
const { response } = require("./../../utils/response-helper")
const MESSAGE_CODE = require("../../config/message-code")
const createLogger = require("../../utils/create-logger")
const log = createLogger("user-validation")

class UserRequestValidator {

  updateRecentlyViewProduct = async (req, res, next) => {
    const functionName = "updateRecentlyViewProduct"
    const schema = joi.object({
      productID: joi.string().required()
    })

    try {
      const [error, result] = await safePromise(schema.validateAsync(req.body))
      if(error) {
        log.error(functionName, "Error in validation", error)
        return res.status(422).json(response({
          messageCode: MESSAGE_CODE.VALIDATION_ERROR,
          message: error.message
        }))
      }
      next()
    } catch (error) {
      log.error(functionName, "Error in validation: catch error", error)
      return res.status(422).json(response({
        messageCode: MESSAGE_CODE.VALIDATION_ERROR,
        message: error.message
      }))
    }
  }
}

module.exports = UserRequestValidator