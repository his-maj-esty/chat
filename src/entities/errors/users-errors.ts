class UserNotFoundError extends Error {
  constructor() {
    super("User not found");
    this.name = "UserNotFoundError";
  }
}

class UserAlreadyExists extends Error {
  constructor() {
    super("User already exists");
    this.name = "UserAlreadyExists";
  }
}

class UserNotAuthorized extends Error {
  constructor() {
    super("User not authorized");
    this.name = "UserNotAuthorized";
  }
}
