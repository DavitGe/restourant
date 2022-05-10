// module.exports = class UserDto {
//   email
//   id
//   username
//   isActivated

//   constructor(model) {
//     email = model.email
//     id = model._id
//     username = model.username
//     isActivated = model.isActivated
//   }
// }

const UserDto = (user) => {
  return {
    email: user.email,
    _id: user._id,
    username: user.username,
    isActivated: user.isActivated,
  }
}

module.exports = UserDto
