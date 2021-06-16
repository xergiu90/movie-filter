export const mockLoginData = {
  valid: {
    email: 'user1@email.com',
    password: 'user1'
  },
  invalid: {
    emailRequired: '',
    emailInvalid: 'test',
    passwordRequired: '',
    passwordInvalid: 'test',
  }
};

export const dialogMock = {
  close: () => { }
};
