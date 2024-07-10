async function login(user) {
    const response = await fetch('http://localhost:5000/api/data/session/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user }),
        credentials: 'include'
    });
    if (response.status === 200) {
        return await response.json();
    } else {
        throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
    }
}

async function register(user) {
    try {
        const response = await fetch('http://localhost:5000/api/data/session/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

async function logout() {
    const response = await fetch('http://localhost:5000/api/data/session/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    const data = await response.json();
    return data;

}

async function isLogged() {
    const response = await fetch('http://localhost:5000/api/data/session', {
        method: 'GET',
        credentials: 'include',
    });
    return response.status === 200;
}

async function getLoggedUser() {
    const response = await fetch('http://localhost:5000/api/data/session', {
        method: 'GET',
        credentials: 'include',
    });

    if (response.status === 200) {
        const data = await response.json();
        return data.user;
    } else {
        return null;
    }
}

export async function clearFinishedBets() {
    await fetch('http://localhost:5000/api/data/session/bets', {
        method: 'DELETE',
        credentials: 'include',
    });
}


export async function getLoginStatus() {
    const response = await fetch('http://localhost:5000/api/data/session', {
        method: 'GET',
        credentials: 'include',
    });
    return response.status;
}

async function requireLoggedUser() {
    if (await getLoginStatus() === 200) {
        return true;
    } else {
        window.location.href = `/login`;
    }
}

export async function requireGuestUser() {
    if (await getLoginStatus() === 200) {
        window.location.href = `/`;
    } else {
        return false;
    }
}

async function updateUser(user) {
    const response = await fetch('http://localhost:5000/api/data/session/user', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
}

async function deleteUser(password) {
    const response = await fetch('http://localhost:5000/api/data/session/deleteAccount', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });

    return response;
}

async function changePassword(oldPassword, newPassword, confirmPassword) {
    const response = await fetch('http://localhost:5000/api/data/session/changePassword', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
    });

    return response;
}

async function resetPassword(token, newPassword, confirmPassword) {
    try {
        const response = await fetch('http://localhost:5000/api/data/session/resetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, newPassword, confirmPassword })
        });

        if (response.ok) {
            return await response.json();
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }
    } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe :', error);
        throw new Error('Erreur lors de la réinitialisation du mot de passe : ' + error.message);
    }
}

export {
    login,
    register,
    logout,
    isLogged,
    requireLoggedUser,
    getLoggedUser,
    updateUser,
    deleteUser,
    changePassword,
    resetPassword
};