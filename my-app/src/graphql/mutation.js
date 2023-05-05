import { gql } from "@apollo/client";

export const REGISTRATION = gql`
  mutation Registration(
    $emtrail: String!
    $username: Sing!
    $password: String!
  ) {
    registration(email: $email, username: $username, password: $password) {
      activeToken
      refreshToken
      user {
        username
        email
        isActivated
        _id
      }
    }
  }
`;

export const ACTIVATION = gql`
  mutation Activation($activationLink: String) {
    activation(activationLink: $activationLink) {
      isActivated
      username
    }
  }
`;

export const AUTHORIZATION = gql`
  mutation Authorization($password: String, $username: String) {
    login(password: $password, username: $username) {
      activeToken
      user {
        username
      }
    }
  }
`;

export const ISAUTH = gql`
  mutation IsAuth {
    checkAuth
  }
`;

export const SEND_RES_LINK = gql`
  mutation SendResLink($email: String) {
    sendResLink(email: $email)
  }
`;

export const RES_PASS = gql`
  mutation ResPass($password: String, $restoreLink: String) {
    resPass(password: $password, restoreLink: $restoreLink) {
      activeToken
    }
  }
`;
