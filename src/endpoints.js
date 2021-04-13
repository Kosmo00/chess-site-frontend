export const getPostEndpoint = (username, post_title) => {
    return `http://localhost:4000/api/posts/${username}/${post_title}`
}

export const getAllPostsEndpoint = () => {
    return 'http://localhost:4000/api/posts'
}