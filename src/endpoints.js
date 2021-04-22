const prefix = 'http://localhost:4000'

export const getPostEndpoint = (username, post_title) => {
    return `${prefix}/api/posts/${username}/${post_title}`
}

export const getAllPostsEndpoint = () => {
    return `${prefix}/api/posts`
}

export const postLogin = () => {
    return `${prefix}/api/login`
}

export const postRegister = () => {
    return `${prefix}/api/register`
}

export const logout = () => {
    return `${prefix}/api/logout`
}
