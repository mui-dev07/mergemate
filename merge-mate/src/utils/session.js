// Session management utilities for Laravel Sanctum
class Session {
    // Store data in session storage
    static set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    // Retrieve data from session storage
    static get(key) {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    // Remove specific item from session storage
    static remove(key) {
        sessionStorage.removeItem(key);
    }

    // Clear all session data
    static clear() {
        sessionStorage.clear();
    }

    // Check if user is authenticated
    static isAuthenticated() {
        return !!this.get('user');
    }

    // Set user data in session
    static setUser(userData) {
        this.set('user', userData);
    }

    // Get current user data
    static getUser() {
        return this.get('user');
    }

    // Set the CSRF token
    static setCsrfToken(token) {
        this.set('csrf_token', token);
    }

    // Get the CSRF token
    static getCsrfToken() {
        return this.get('csrf_token');
    }

    // Handle Sanctum authentication
    static async login(credentials) {
        // First get CSRF cookie from sanctum
        await fetch('/sanctum/csrf-cookie', {
            credentials: 'include'
        });

        // Attempt login
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.getCsrfToken(),
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        });

        if (response.ok) {
            const userData = await response.json();
            this.setUser(userData);
            return true;
        }
        return false;
    }

    // Handle logout
    static async logout() {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': this.getCsrfToken(),
            },
            credentials: 'include'
        });

        if (response.ok) {
            this.clear();
            return true;
        }
        return false;
    }
}

export default Session;
