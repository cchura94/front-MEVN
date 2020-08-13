export function authGuard(to, from, next) {
    try {
        const authUser = JSON.parse(atob(localStorage.getItem("token")))

        if (!authUser && !authUser.access_token) {
            next({
                name: "Login"
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        localStorage.clear();
        next({
            name: "Login"
        })
    }
}