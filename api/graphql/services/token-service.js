require('dotenv').config()
const jwt = require('jsonwebtoken')
const Token = require('../../models/token')

class tokenService {
  generateTokens(payload) {
    const activeToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    })
    return {
      activeToken,
      refreshToken,
    }
  }
  async saveToken(userId, refreshToken) {
    let tokenData = await Token.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return await tokenData.save()
    } else {
      const token = await Token.create({ user: userId, refreshToken })
      return token
    }
  }
  async removeToken(refreshToken) {
    const tokenData = Token.deleteOne({ refreshToken })
    return tokenData
  }
}

module.exports = new tokenService()
