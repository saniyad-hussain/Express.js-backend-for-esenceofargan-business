export const state = {
  csrfSecret: '',
  event401Listeners: [],
};

function notify401 () {
  state.event401Listeners.forEach(func => {
    func();
  });
}

function handleResponse (res) {
  const token = res.headers.get('csrf-token');
  if (res.status === 401) {
    notify401();
  }
  console.log('handleResponse', { token });
  if (token) {
    state.csrfSecret = token;
  }
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json().then(data => ({ res, data }));
  } else {
    return res.text().then(data => ({ res, data }));
  }
}

function getOptions (options = {}) {
  return {
    credentials: 'same-origin',
    ...options,
    headers: {
      'Accept': 'application/json',
      'csrf-token': state.csrfSecret,
      ...options.headers,
    },
  };
}

function safeFetch (url, options) {
  return Promise.resolve().then(() => {
    if (!state.csrfSecret) {
      return fetch('/api/mock/', getOptions()).then(handleResponse);
    }
  }).then(() => {
    console.log('real request', { token: state.csrfSecret });
    return fetch(url, getOptions(options));
  });
}

export function on401 (func) {
  state.event401Listeners.push(func);
  return () => {
    state.event401Listeners = state.event401Listeners.filter(attachedFunc => attachedFunc !== func);
  };
}

export const get = (url, options) => {
  return fetch(url, options)
    .then(handleResponse);
};

export const post = (url, body) => {
  return safeFetch(url, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(handleResponse);
};

export const put = (url, id, body) => {
  return safeFetch(`${url}/${id}`, {
    method: 'put',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(handleResponse);
};

export const del = (url, id) => {
  return safeFetch(`${url}/${id}`, {
    method: 'delete',
  })
    .then(handleResponse);
};

export const reportError = (description, error) => {
  return post('/api/error-log', {
    description: 'Something crashed, showing user error page',
    error: {
      message: error.message,
      name: error.name,
    },
  })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
};

// TODO Remove this
if (process.env.NODE_ENV === 'development') {
  window.logout = () => {
    post('/logout')
      .then(({ res }) => {
        if (res.ok) {
          console.log('logged out'); // eslint-disable-line no-console
          return;
        }
        throw new Error(JSON.stringify(res, null, 2));
      })
      .catch(error => {
        console.log(error);
      });
  };
}
