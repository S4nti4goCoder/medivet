function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function isTokenExpired(token) {
  const decodedToken = parseJwt(token);
  if (!decodedToken || !decodedToken.exp) {
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}

export const setupGuards = (router) => {
  // 👉 router.beforeEach
  // Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
  router.beforeEach((to) => {
    /*
     * If it's a public route, continue navigation. This kind of pages are allowed to visited by login & non-login users. Basically, without any restrictions.
     * Examples of public routes are, 404, under maintenance, etc.
     */
    if (to.meta.public) return;

    /**
     * Check if user is logged in by checking if token & user data exists in local storage
     * Feel free to update this logic to suit your needs
     */
    const isLoggedIn = !!(
      localStorage.getItem("user") && localStorage.getItem("token")
    );
    console.log(isLoggedIn);
    if (isLoggedIn && isTokenExpired(localStorage.getItem("token"))) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        name: "login",
        query: {
          ...to.query,
          to: to.fullPath !== "/" ? to.path : undefined,
        },
      };
    }
    /*
          If user is logged in and is trying to access login like page, redirect to home
          else allow visiting the page
          (WARN: Don't allow executing further by return statement because next code will check for permissions)
         */
    if (to.meta.unauthenticatedOnly) {
      if (isLoggedIn) return "/";
      else return undefined;
    }
    console.log(to);
    if (to.meta.not_authenticated == false) {
      return true;
    }
    if (!isLoggedIn && to.matched.length) {
      /* eslint-disable indent */
      return isLoggedIn
        ? { name: "not-authorized" }
        : {
            name: "login",
            query: {
              ...to.query,
              to: to.fullPath !== "/" ? to.path : undefined,
            },
          };
      /* eslint-enable indent */
    }
  });
};
