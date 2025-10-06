// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';

const API_BASE = 'http://localhost:5000';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);      // becomes true after first /me OR an immediate login/register success
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  // Helper: fetch with credentials for cookie-based auth
  const apiFetch = useMemo(() => {
    return async (path, opts = {}) => {
      const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
      const res = await fetch(url, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
        ...opts,
      });
      return res;
    };
  }, []);

  // Discover current session on mount
  useEffect(() => {
    mounted.current = true;
    (async () => {
      try {
        const res = await apiFetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (!mounted.current) return;
          setUser(data.user ?? data);
        } else {
          if (!mounted.current) return;
          setUser(null);
        }
      } catch {
        if (!mounted.current) return;
        setUser(null);
      } finally {
        if (!mounted.current) return;
        setReady(true);
      }
    })();

    // Cross-tab sync (login/logout)
    const onStorage = (e) => {
      if (e.key === 'auth:event') {
        const { type } = JSON.parse(e.newValue || '{}');
        if (type === 'logout') setUser(null);
        if (type === 'login') {
          apiFetch('/api/auth/me')
            .then(r => r.ok ? r.json() : null)
            .then(data => setUser(data?.user ?? data ?? null))
            .catch(() => {});
        }
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      mounted.current = false;
      window.removeEventListener('storage', onStorage);
    };
  }, [apiFetch]);

  // --- utils ---
  const safeJson = async (res) => {
    try { return await res.json(); } catch { return null; }
  };

// 1) Move refresh ABOVE login/register/logout
const refresh = useCallback(async () => {
  const res = await apiFetch('/api/auth/me');
  if (res.ok) {
    const data = await res.json();
    setUser(data.user ?? data);
    return data.user ?? data;
  } else {
    setUser(null);
    return null;
  }
}, [apiFetch]);

// 2) Use refresh inside login
const login = useCallback(async ({ email, password }) => {
  setLoading(true);
  try {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const body = await safeJson(res);
    if (!res.ok) throw new Error(body?.message || `Login failed (${res.status})`);

    // optimistic (in case backend returns user)
    if (body?.user) setUser(body.user);

    // authoritative (cookie session): ensures navbar updates immediately
    await refresh();

    setReady(true);
    localStorage.setItem('auth:event', JSON.stringify({ type: 'login', ts: Date.now() }));
    return body?.user ?? null;
  } finally {
    setLoading(false);
  }
}, [apiFetch, refresh]);

// 3) Same for register
const register = useCallback(async ({ name, email, password }) => {
  setLoading(true);
  try {
    const res = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    const body = await safeJson(res);
    if (!res.ok) throw new Error(body?.message || `Register failed (${res.status})`);

    if (body?.user) setUser(body.user);

    await refresh();

    setReady(true);
    localStorage.setItem('auth:event', JSON.stringify({ type: 'login', ts: Date.now() }));
    return body?.user ?? null;
  } finally {
    setLoading(false);
  }
}, [apiFetch, refresh]);

// 4) Logout can stay as-is (or you can also await refresh() after clearing)
const logout = useCallback(async () => {
  setLoading(true);
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    setUser(null);               // immediate UI swap to Login/Register
    // Optionally: await refresh(); // not necessary, since we just nulled user
    localStorage.setItem('auth:event', JSON.stringify({ type: 'logout', ts: Date.now() }));
  } finally {
    setLoading(false);
  }
}, [apiFetch]);


  const value = useMemo(
    () => ({ user, setUser, ready, loading, login, register, logout, refresh, API_BASE }),
    [user, ready, loading, login, register, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
