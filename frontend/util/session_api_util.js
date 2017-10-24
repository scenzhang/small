
export function signup(user_params) {
  return $.ajax({
    method: 'post',
    url: 'api/users',
    data: { user: user_params }
  });
}

export function login(user_params) {
  return $.ajax({
    method: 'post',
    url: 'api/session',
    data: { user: user_params }
  });
}

export function logout() {
  return $.ajax({
    method: 'delete',
    url: 'api/session'
  })
}