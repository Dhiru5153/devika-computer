export const apiUrl = 'https://adityaastro.in/laravel8/public/api/';
// export const apiUrl = 'http://localhost:8000/api/';
export const fileUrl = 'https://adityaastro.in/laravel8/public/';
// export const fileUrl = 'http://localhost:8000/';
export const token = () => {
    const userInfo = localStorage.getItem('userInfo');
    const data = JSON.parse(userInfo);
    return data.token;
}