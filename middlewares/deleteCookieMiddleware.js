

export const deleteCookieMiddleware = (req, res, next) => {
    res.clearCookie('token')

    next()
}