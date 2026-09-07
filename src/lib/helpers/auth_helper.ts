function saveSession(user: any, token: string, expiredAt: string) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  localStorage.setItem("expired_at", expiredAt);
}

function getSession() {
  let user = localStorage.getItem("user");
  let token = localStorage.getItem("token");
  let expiredAt = localStorage.getItem("expired_at");

  return {
    user: user ? JSON.parse(user) : null,
    token: token ? token : null,
    expiredAt: expiredAt ? expiredAt : null
  };
}

export { saveSession, getSession };