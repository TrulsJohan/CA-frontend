export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
        case '/index.html':
            await import('./views/home.js');
            break;
        case '/auth/register/index.html':
            await import('./views/register.js');
            break;
        case '/auth/login/index.html':
            await import('./views/login.js');
            break;
        case '/profile/index.html':
            await import('./views/profile.js');
            break;
        case '/post/create/index.html':
            await import('./views/create.js');
            break;
        case '/post/update/index.html':
            await import('./views/update.js');
            break;
        default:
            await import('./views/notFound.js');
    }
}
