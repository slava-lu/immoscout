export const fetchData = async (url, options) => {
  try {
    const fetchResult = await fetch(url, options);
    const data = await handleResponse(fetchResult);
    return {
      response: {
        ok: true,
      },
      data: data.body,
      headers: data.headers,
    };
  } catch (error) {
    return {
      response: {
        ok: false,
      },
      error: {
        message: error.message,
        status: error.status,
        rawResponse: error.rawResponse,
      },
    };
  }
};

function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  if (contentType) {
    if (contentType.includes('application/json')) {
      return handleJSONResponse(response);
    }
    if (contentType.includes('text/plain') || contentType.includes('text/html')) {
      return handleTextResponse(response);
    }
  }
  if (!contentType) {
    return handleHeaderResponse(response);
  }

  throw new Error(`Sorry, content-type ${contentType} not supported`);
}

function handleJSONResponse(response) {
  const headers = {
    totalCount: response.headers.get('X-Total-Count'),
    link: response.headers.get('Link'),
  };
  return response.json()
    .then((body) => {
      if (response.ok) {
        return { body, headers };
      }
      return Promise.reject({
        message: body.message,
        status: response.status,
        rawResponse: body,
      });
    });
}

function handleTextResponse(response) {
  return response.text()
    .then((body) => {
      if (response.ok) {
        return { body };
      }
      return Promise.reject({
        message: body,
      });
    });
}

function handleHeaderResponse(response) {
  const headers = {
    location: response.headers.get('Location'),
  };
  return response.text()
    .then((body) => {
      if (response.ok) {
        return { body, headers };
      }
      return Promise.reject({
        message: body,
      });
    });
}