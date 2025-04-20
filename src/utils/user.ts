const redirectUri = "http://localhost:3000/oauth2/redirect";
const apiBaseUrl = "http://localhost:8080";

const request = (options: any) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (localStorage.getItem("accessToken")) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: apiBaseUrl + "/game",
    method: "GET",
  });
}
