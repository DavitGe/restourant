require('dotenv').config()
const UserDto = require('../../dtos/user-dto')
const User = require('../../models/users')
const ApiError = require('../../exceptions/api-error')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')

class userService {
  async login(username, password) {
    try {
      let user = await User.findOne({ username })
      if (!user) {
        user = await User.findOne({ email: username })
      }
      if (!user) {
        throw ApiError.BadRequest('User with such username is not found')
      }
      const isPassEqual = await bcrypt.compare(password, user.password)
      if (!isPassEqual) {
        throw ApiError.BadRequest('Password is not correct')
      }
      const userDto = UserDto(user)
      const tokens = tokenService.generateTokens({ ...userDto })
      // await tokenService.saveToken(userDto.id, tokens.refreshToken)

      return {
        ...tokens,
        user: userDto,
      }
    } catch (e) {
      throw ApiError.unexpectedError(e)
    }
  }
}

module.exports = new userService()
