import {Dispatcher} from 'flux';

const flux = new Dispatcher();

export function register(callback) {
  console.log("register")
  return flux.register(callback);
}

export function waitFor(ids) {
  return flux.waitFor(ids);
}

export function dispatch(actionType, action = {}) {

  if(!actionType) {
    throw new Error("添加Action标识")
  }
  flux.dispatch({actionType, ...action});
};

export function dispatchAsync(promise, types, action = {}, callBack = {}) {

  const { request, success, failure, actionName } = types;

  dispatch(request, {"queryParams": action});

  promise.then(
    response => (
      dispatch(success, { ...{"queryParams": action, "actionName": actionName}, response, callBack })
    ),
    error => (
      dispatch(failure, { ...{"queryParams": action, "actionName": actionName}, error, callBack })
    )
  );

}