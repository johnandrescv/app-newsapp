export const loginRequest = async (body) => {
    const formbody = new FormData();
    formbody.append('id', body.id);
    formbody.append('type', body.type);
    formbody.append('image', body.image);
    formbody.append('name', body.name);
    const response = await fetch('https://jac-translate-api.herokuapp.com/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formbody
    });
    const result = await response.json();
    return result.user;
}
