export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
        case '/index.html':
            await import('/src/views/home.js');
            break;
        case '/auth/register/index.html':
            await import('/src/views/register.js');
            break;
        case '/auth/login/index.html':
            await import('/src/views/login.js');
            break;
        case '/profile/index.html':
            await import('/src/views/profile.js');
            break;
        case '/post/create/index.html':
            await import('/src/views/create.js');
            break;
        case '/post/update/index.html':
            await import('/src/views/update.js');
            break;
        default:
            await import('/src/views/notFound.js');
    }
}
