require("dotenv").config();

const User = require("../models/users");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./services/mail-service");
const tokenService = require("./services/token-service");
const userService = require("./services/user-service");
const jwt = require("jsonwebtoken");

const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const { ApolloServerPluginCacheControl } = require("apollo-server-core");
const resolvers = {
  userQuery: {
    users: async () => await User.find({}),
  },
  userMutation: {
    registration: async (_, args, { res }) => {
      try {
        const { email, username, password } = args;
        let candidate = await User.findOne({ email });
        if (candidate) {
          throw ApiError.BadRequest("User with such mail already exists.");
        }
        candidate = await User.findOne({ username });
        if (candidate) {
          throw ApiError.BadRequest("User with such username already exists.");
        }
        if (password.length < 5 || password.length > 32) {
          throw ApiError.BadRequest(
            "Password should be between 5 and 32 characters long"
          );
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        try {
          const restoreLink = uuid.v4();
          const user = await User.create({
            username,
            email,
            password: hashPassword,
            activationLink,
            restoreLink,
          });
          await mailService.sendActivationMail(
            `${process.env.API_URL}/api/activate/${activationLink}`,
            email
          );
          const userDto = UserDto(user);
          const tokens = tokenService.generateTokens({ ...userDto });
          // await tokenService.saveToken(userDto._id, tokens.refreshToken)
          return {
            ...tokens,
            user: userDto,
          };
        } catch (e) {
          const { message } = e;
          throw ApiError.BadRequest(message);
        }
      } catch (e) {
        throw ApiError.unexpectedError(e);
      }
    },
    activation: async (_, args) => {
      try {
        const { activationLink } = args;
        var user = await User.findOne({ activationLink });
        if (!user) {
          throw ApiError.BadRequest("Activation link is expired or wrong.");
        }
        user.isActivated = true;
        await user.save();
        return UserDto(user);
      } catch (e) {
        throw ApiError.unexpectedError(e);
      }
    },
    login: async (_, args) => {
      try {
        const { username, password } = args;
        const userData = await userService.login(username, password);
        return userData;
      } catch (e) {
        throw ApiError.unexpectedError(e);
      }
    },
    checkAuth: async (_, args, { req }) => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return false;
        }
        if (!authHeader.includes("Bearer ")) {
          return false;
        }
        const token = authHeader.slice(7);
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        if (!_id) {
          return false;
        }
        const user = User.findById(_id);
        if (user) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        throw ApiError.unexpectedError(e);
      }
    },
    resPass: async (_, args) => {
      try {
        const { restoreLink, password } = args;
        let user = await User.findOne({ restoreLink });
        if (!user) {
          throw ApiError.BadRequest("Link is not valid");
        }
        const hashPassword = await bcrypt.hash(password, 3);
        user.password = hashPassword;
        const newRestoreLink = uuid.v4();
        user.restoreLink = newRestoreLink;
        await user.save();
        const userDto = UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        return {
          ...tokens,
          user: userDto,
        };
      } catch (e) {
        throw ApiError.unexpectedError(e);
      }
    },
    sendResLink: async (_, args) => {
      try {
        const { email } = args;
        const user = await User.findOne({ email });
        if (!user) {
          throw ApiError.BadRequest("User with such email doesn't exist");
        }

        mailService.sendRestoreMail(
          `${process.env.API_URL}/api/restore/${user.restoreLink}`,
          email
        );
        return true;
      } catch (e) {
        throw ApiError.unexpectedError(e);
      }
    },
  },
};

module.exports = resolvers;
